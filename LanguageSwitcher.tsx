import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-slate-200 dark:bg-white/5 p-1 rounded-full border border-slate-300 dark:border-white/10">
      <Globe className="w-4 h-4 ml-2 text-slate-500 dark:text-white/40" />
      {(['en', 'hi', 'kn'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
            language === lang
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
              : 'text-slate-600 dark:text-white/40 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
