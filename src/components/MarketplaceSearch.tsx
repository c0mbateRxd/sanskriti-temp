import React from 'react';
import { Search, Sparkles, SlidersHorizontal } from 'lucide-react';

interface MarketplaceSearchProps {
  value: string;
  onChange: (val: string) => void;
}

export default function MarketplaceSearch({ value, onChange }: MarketplaceSearchProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className="relative flex-1 group w-full">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-500" />
        <div className="relative flex items-center bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="pl-5 text-slate-400 dark:text-white/30">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search for unique crafts, artisans, or materials..."
            className="w-full py-5 px-4 bg-transparent outline-none text-sm font-bold placeholder:text-slate-400 dark:placeholder:text-white/20 text-slate-900 dark:text-white"
          />
          <div className="pr-4 hidden sm:block">
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/10 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40">AI Sorter</span>
            </div>
          </div>
        </div>
      </div>
      
      <button className="flex items-center gap-2 px-6 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40 hover:text-indigo-500 transition-colors">
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </button>
    </div>
  );
}
