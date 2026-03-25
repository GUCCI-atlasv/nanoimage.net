'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

type BarState = 'visible' | 'negative' | 'thanks' | 'hidden';

export default function FeedbackBar({ toolSlug }: { toolSlug: string }) {
  const t = useTranslations('bar');
  const router = useRouter();
  const [state, setState] = useState<BarState>('hidden');
  const [negativeTxt, setNegativeTxt] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('feedback_bar_dismissed');
    const submitted = sessionStorage.getItem('feedback_submitted');
    if (!dismissed && !submitted) setState('visible');
  }, []);

  function dismiss() {
    sessionStorage.setItem('feedback_bar_dismissed', '1');
    setState('hidden');
  }

  async function sendQuick(type: 'quick-positive' | 'quick-negative', description?: string) {
    setSending(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, tool: toolSlug, description: description || `${type} feedback` }),
      });
    } catch { /* silent */ }
    sessionStorage.setItem('feedback_submitted', '1');
    setState('thanks');
    setTimeout(() => setState('hidden'), 1500);
    setSending(false);
  }

  function handleYes() { sendQuick('quick-positive'); }

  function handleNo() { setState('negative'); }

  async function handleNegativeSend() {
    await sendQuick('quick-negative', negativeTxt || 'No details provided');
  }

  function handleNegativeSkip() {
    sessionStorage.setItem('feedback_submitted', '1');
    setState('hidden');
  }

  function goFeedback() {
    router.push(`/feedback?tool=${toolSlug}` as any);
  }

  if (state === 'hidden') return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a1a] border-t border-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {state === 'thanks' && (
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-center">
          <p className="font-mono text-[12px] text-accent">{t('thanks')}</p>
        </div>
      )}

      {state === 'visible' && (
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center gap-3 sm:gap-4">
          <span className="font-mono text-[11px] text-muted hidden sm:block flex-shrink-0">
            💬 {t('question')}
          </span>
          <span className="font-mono text-[11px] text-muted sm:hidden flex-shrink-0">
            💬 {t('question').split(' ').slice(0, 3).join(' ')}…
          </span>
          <button
            onClick={handleYes}
            className="flex-shrink-0 flex items-center gap-1 px-3 py-1 rounded bg-accent/20 text-accent font-mono text-[11px] font-bold hover:bg-accent/30 transition-colors"
          >
            👍 {t('yes')}
          </button>
          <button
            onClick={handleNo}
            className="flex-shrink-0 flex items-center gap-1 px-3 py-1 rounded bg-border text-muted font-mono text-[11px] hover:bg-border/70 transition-colors"
          >
            👎 {t('no')}
          </button>
          <button
            onClick={goFeedback}
            className="flex-shrink-0 font-mono text-[11px] text-muted hover:text-accent transition-colors ml-auto hidden sm:block"
          >
            {t('cta')} →
          </button>
          <button
            onClick={dismiss}
            className="flex-shrink-0 font-mono text-[13px] text-muted hover:text-text transition-colors ml-auto sm:ml-0"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}

      {state === 'negative' && (
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <input
            type="text"
            value={negativeTxt}
            onChange={(e) => setNegativeTxt(e.target.value)}
            placeholder={t('negative.placeholder')}
            className="flex-1 bg-surface border border-border rounded px-3 py-1.5 font-mono text-[12px] text-text focus:outline-none focus:border-accent/50 w-full sm:w-auto"
            autoFocus
          />
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={handleNegativeSkip}
              className="px-3 py-1.5 font-mono text-[11px] text-muted hover:text-text border border-border rounded transition-colors"
            >
              {t('negative.skip')}
            </button>
            <button
              onClick={handleNegativeSend}
              disabled={sending}
              className="px-3 py-1.5 font-mono text-[11px] bg-accent text-bg font-bold rounded hover:bg-accent/90 disabled:opacity-60 transition-colors"
            >
              {sending ? '...' : t('negative.send')}
            </button>
          </div>
          <button
            onClick={dismiss}
            className="font-mono text-[13px] text-muted hover:text-text hidden sm:block"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
