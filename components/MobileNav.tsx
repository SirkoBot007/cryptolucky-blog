'use client';

import { useState } from 'react';

interface NavLink { href: string; label: string; }
interface MobileNavProps { navLinks: NavLink[]; locale: string; affiliateUrl: string; }

export default function MobileNav({ navLinks, locale, affiliateUrl }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex md:hidden items-center gap-3">
      <a href={affiliateUrl} target="_blank" rel="noopener noreferrer sponsored" className="bg-amber-500 text-white font-bold text-xs px-3 py-2 rounded-lg">🎰 BetFury</a>
      <button onClick={() => setOpen(!open)} aria-label="Abrir menú" className="text-slate-300 hover:text-amber-400 p-1">
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-slate-900 border-b border-slate-800 z-50 px-4 py-4 flex flex-col gap-3 shadow-xl">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-slate-300 hover:text-amber-400 font-medium text-sm py-2 border-b border-slate-800 last:border-0">{link.label}</a>
          ))}
        </div>
      )}
    </div>
  );
}
