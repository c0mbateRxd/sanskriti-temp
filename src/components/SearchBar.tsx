import React, { useState } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useLanguage();
  const [isSearching, setIsSearching] = useState(false);

  const handleAISearch = async () => {
    if (!value.trim()) return;
    setIsSearching(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are an Indian culture expert. The user searched: "${value}". 
            Extract the most relevant Indian state name or art form or dance form from this query.
            Reply with ONLY a single keyword that best matches an Indian state, dance, art, or textile.
            Examples: "Bharatanatyam", "Karnataka", "Silk", "Kathak", "Rajasthan"
            Just one word or state name, nothing else.`
          }]
        })
      });

      const data = await response.json();
      const suggestion = data.content?.[0]?.text?.trim();
      if (suggestion) {
        onChange(suggestion);
      }
    } catch (error) {
      console.error('AI search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

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
          onKeyPress={(e) => e.key === 'Enter' && handleAISearch()}
          placeholder={t('search_placeholder')}
          className="w-full py-5 px-4 bg-transparent outline-none text-sm font-bold placeholder:text-slate-400 dark:placeholder:text-white/20 text-slate-900 dark:text-white"
        />
        <button
          onClick={handleAISearch}
          disabled={isSearching || !value.trim()}
          className="pr-4 flex items-center gap-1.5 bg-slate-100 dark:bg-white/10 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all disabled:opacity-50 mr-2"
        >
          {isSearching 
            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
            : <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          }
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40">
            {isSearching ? 'Searching...' : 'AI Search'}
          </span>
        </button>
      </div>
    </div>
  );
}
