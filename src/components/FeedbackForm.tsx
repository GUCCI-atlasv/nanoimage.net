'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { tools } from '@/lib/tools';

type FeedbackType = 'bug' | 'feature' | 'other' | '';
type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function FeedbackForm({ prefillTool = '' }: { prefillTool?: string }) {
  const t = useTranslations('feedback');

  const [feedbackType, setFeedbackType] = useState<FeedbackType>('');
  const [tool, setTool] = useState(prefillTool);
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [screenshotName, setScreenshotName] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  function validate() {
    const errs: Record<string, string> = {};
    if (!feedbackType) errs.type = 'Please select a feedback type.';
    if (!description || description.trim().length < 10) errs.description = 'Please enter at least 10 characters.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email address.';
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('submitting');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: feedbackType, tool: tool || 'general', description, email, screenshot }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setErrors(prev => ({ ...prev, screenshot: 'File must be under 5MB.' })); return; }
    const reader = new FileReader();
    reader.onload = () => { setScreenshot(reader.result as string); setScreenshotName(file.name); };
    reader.readAsDataURL(file);
  }

  function reset() {
    setFeedbackType(''); setTool(prefillTool); setDescription('');
    setEmail(''); setScreenshot(null); setScreenshotName('');
    setStatus('idle'); setErrors({});
  }

  const toolOptions = [
    { value: 'general', label: t('tool.general') },
    ...tools.map(tool => ({ value: tool.slug, label: tool.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) })),
  ];

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-6 lg:px-12 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6">
          <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-extrabold text-text mb-3">{t('success.title')}</h2>
        <p className="font-mono text-[13px] text-muted mb-2">{t('success.body')}</p>
        <p className="font-mono text-[12px] text-muted/70 mb-8">{t('success.reply')}</p>
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-accent text-bg font-mono text-[12px] font-bold uppercase tracking-[2px] rounded-md hover:bg-accent/90 transition-colors"
        >
          {t('success.again')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 lg:px-12 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-text mb-3 tracking-tight">
          {t('title')}
        </h1>
        <p className="font-mono text-[13px] text-muted">{t('subtitle')}</p>
      </div>

      {/* Error banner */}
      {status === 'error' && (
        <div className="mb-6 p-4 bg-accent2/10 border border-accent2/30 rounded-lg">
          <p className="font-mono text-[12px] text-accent2">{t('error')}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Feedback Type */}
        <div>
          <p className="font-mono text-[11px] text-muted uppercase tracking-[2px] mb-3 font-bold">
            {t('type.label')} <span className="text-accent2">*</span>
          </p>
          <div className="flex flex-wrap gap-3">
            {(['bug', 'feature', 'other'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFeedbackType(type)}
                className={`px-4 py-2 rounded-md font-mono text-[12px] border transition-all ${
                  feedbackType === type
                    ? 'bg-accent text-bg border-accent font-bold'
                    : 'border-border text-muted hover:border-accent/50 hover:text-text'
                }`}
              >
                {type === 'bug' && '🐛 '}{type === 'feature' && '✨ '}{type === 'other' && '💬 '}
                {t(`type.${type}`)}
              </button>
            ))}
          </div>
          {errors.type && <p className="mt-1.5 font-mono text-[11px] text-accent2">{errors.type}</p>}
        </div>

        {/* Tool selector */}
        <div>
          <label className="block font-mono text-[11px] text-muted uppercase tracking-[2px] mb-2 font-bold">
            {t('tool.label')}
          </label>
          <select
            value={tool}
            onChange={(e) => setTool(e.target.value)}
            className="w-full bg-surface border border-border rounded-md px-3 py-2.5 font-mono text-[12px] text-text focus:outline-none focus:border-accent/50 transition-colors"
          >
            <option value="">— {t('tool.general')} —</option>
            {toolOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-mono text-[11px] text-muted uppercase tracking-[2px] mb-2 font-bold">
            {t('description.label')} <span className="text-accent2">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 2000))}
            placeholder={t('description.placeholder')}
            rows={5}
            className={`w-full bg-surface border rounded-md px-3 py-2.5 font-mono text-[12px] text-text resize-none focus:outline-none transition-colors ${
              errors.description ? 'border-accent2' : 'border-border focus:border-accent/50'
            }`}
          />
          <div className="flex justify-between mt-1">
            {errors.description
              ? <p className="font-mono text-[11px] text-accent2">{errors.description}</p>
              : <span />}
            <p className="font-mono text-[11px] text-muted">{description.length} / 2000</p>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block font-mono text-[11px] text-muted uppercase tracking-[2px] mb-2 font-bold">
            {t('email.label')}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('email.placeholder')}
            className={`w-full bg-surface border rounded-md px-3 py-2.5 font-mono text-[12px] text-text focus:outline-none transition-colors ${
              errors.email ? 'border-accent2' : 'border-border focus:border-accent/50'
            }`}
          />
          {errors.email && <p className="mt-1 font-mono text-[11px] text-accent2">{errors.email}</p>}
        </div>

        {/* Screenshot */}
        <div>
          <label className="block font-mono text-[11px] text-muted uppercase tracking-[2px] mb-2 font-bold">
            {t('screenshot.label')}
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFile}
            className="hidden"
          />
          {screenshot ? (
            <div className="flex items-center gap-3 p-3 bg-surface border border-border rounded-md">
              <img src={screenshot} alt="preview" className="w-12 h-12 object-cover rounded" />
              <span className="font-mono text-[12px] text-muted flex-1 truncate">{screenshotName}</span>
              <button
                type="button"
                onClick={() => { setScreenshot(null); setScreenshotName(''); if (fileRef.current) fileRef.current.value = ''; }}
                className="font-mono text-[11px] text-accent2 hover:text-accent2/80"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-border rounded-md font-mono text-[12px] text-muted hover:border-accent/50 hover:text-text transition-colors"
            >
              <span>⬆</span>
              <span>{t('screenshot.upload')}</span>
              <span className="text-muted/50">— {t('screenshot.hint')}</span>
            </button>
          )}
          {errors.screenshot && <p className="mt-1 font-mono text-[11px] text-accent2">{errors.screenshot}</p>}
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full sm:w-auto px-8 py-3 bg-accent text-bg font-mono text-[13px] font-bold uppercase tracking-[2px] rounded-md hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {status === 'submitting' ? (
              <span className="flex items-center gap-2 justify-center">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t('submitting')}
              </span>
            ) : t('submit')}
          </button>
        </div>

        {/* Direct email fallback */}
        <p className="font-mono text-[11px] text-muted pt-2">
          {t('direct')}{' '}
          <a href="mailto:support@nanoimage.net" className="text-accent hover:underline">
            support@nanoimage.net
          </a>
        </p>
      </form>
    </div>
  );
}
