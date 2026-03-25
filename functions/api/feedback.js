const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://www.nanoimage.net',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { type, email, description, tool } = body;

    if (!description || description.trim().length < 10) {
      return json({ error: 'Description too short' }, 400);
    }

    const toolName = tool && tool !== 'general' ? tool : 'General';
    const subject = `[${type || 'Feedback'}] ${toolName} — ${description.substring(0, 50)}${description.length > 50 ? '...' : ''}`;

    const emailBody = [
      'NanoImage Feedback',
      '==================',
      `Type:       ${type || 'Not specified'}`,
      `Tool:       ${toolName}`,
      `User Email: ${email || 'Not provided'}`,
      `Submitted:  ${new Date().toISOString()}`,
      '',
      'Description:',
      description,
    ].join('\n');

    const from = 'feedback@nanoimage.net';
    const to = 'support@nanoimage.net';

    // Build raw MIME email (RFC 2822)
    const replyToHeader = email ? `Reply-To: ${email}\r\n` : '';
    const rawEmail =
      `From: NanoImage Feedback <${from}>\r\n` +
      `To: NanoImage Support <${to}>\r\n` +
      replyToHeader +
      `Subject: ${subject}\r\n` +
      `Content-Type: text/plain; charset=utf-8\r\n` +
      `\r\n` +
      emailBody;

    // Use Cloudflare Email Workers binding (env.SEND_EMAIL)
    if (env.SEND_EMAIL) {
      const { EmailMessage } = await import('cloudflare:email');
      const encoder = new TextEncoder();
      const encoded = encoder.encode(rawEmail);
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoded);
          controller.close();
        },
      });
      const message = new EmailMessage(from, to, stream);
      await env.SEND_EMAIL.send(message);
      return json({ success: true }, 200);
    }

    // Fallback: log and return success (dev/unconfigured environment)
    console.log('[Feedback] SEND_EMAIL binding not configured. Email content:', emailBody);
    return json({ success: true }, 200);

  } catch (err) {
    console.error('Feedback error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}
