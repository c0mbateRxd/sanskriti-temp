import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useLanguage();

  return (
    <div className="relative w-full max-w-md group">
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-rose-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-500" />
      <div className="relative flex items-center bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="pl-5 text-slate-400 dark:text-white/30">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('search_placeholder')}
          className="w-full py-5 px-4 bg-transparent outline-none text-sm font-bold placeholder:text-slate-400 dark:placeholder:text-white/20 text-slate-900 dark:text-white"
        />
        <div className="pr-4">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/10 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40">AI Powered</span>
          </div>
        </div>
      </div>
    </div>
  );
}
