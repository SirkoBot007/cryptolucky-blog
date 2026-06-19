'use client';

import { useState } from 'react';

interface Props {
  url: string;
  title: string;
  locale?: string;
}

export default function SocialShare({ url, title, locale = 'es' }: Props) {
  const [copied, setCopied] = useState(false);
  const isEs = locale === 'es';
  const encoded = encodeURIComponent(url);
  const textEncoded = encodeURIComponent(`${title} — CryptoLucky`);

  function copyLink() {
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2 py-5 border-t border-slate-700/50 mt-8">
      <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
        {isEs ? 'Compartir:' : 'Share:'}
      </span>

      <a
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${textEncoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 bg-slate-800/50 hover:bg-slate-800 transition-all duration-200"
        aria-label="Share on X / Twitter"
      >
        𝕏 Twitter
      </a>

      <a
        href={`https://wa.me/?text=${textEncoded}%20${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-green-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 hover:border-green-500/40 bg-slate-800/50 hover:bg-slate-800 transition-all duration-200"
        aria-label="Share on WhatsApp"
      >
        WhatsApp
      </a>

      <a
        href={`https://t.me/share/url?url=${encoded}&text=${textEncoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 hover:border-blue-500/40 bg-slate-800/50 hover:bg-slate-800 transition-all duration-200"
        aria-label="Share on Telegram"
      >
        Telegram
      </a>

      <button
        onClick={copyLink}
        className="text-slate-400 hover:text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 hover:border-amber-500/40 bg-slate-800/50 hover:bg-amber-500/5 transition-all duration-200"
      >
        {copied
          ? (isEs ? '✓ Copiado' : '✓ Copied')
          : (isEs ? 'Copiar enlace' : 'Copy link')}
      </button>
    </div>
  );
}
