import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STATES_DATA, StateCulture } from '../data/states';
import StateCard from './StateCard';
import StateDetailsPanel from './StateDetailsPanel';
import SearchBar from './SearchBar';
import { useLanguage } from '../context/LanguageContext';

export default function StateList() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState<StateCulture | null>(null);

  const filteredStates = useMemo(() => {
    return STATES_DATA.filter(state => {
      const searchStr = search.toLowerCase();
      return (
        state.name.en.toLowerCase().includes(searchStr) ||
        state.name.hi.toLowerCase().includes(searchStr) ||
        state.dance.toLowerCase().includes(searchStr) ||
        state.art.toLowerCase().includes(searchStr)
      );
    });
  }, [search]);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <h2 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-500 dark:from-white dark:to-white/40">
            {t('explore_states')}
          </h2>
          <p className="text-slate-500 dark:text-white/40 leading-relaxed font-medium">
            Dive into the heartbeat of Bharat. Discover 28 states and 8 union territories, each with its own story, art, and traditions legacy.
          </p>
        </div>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {filteredStates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredStates.map((state) => (
              <StateCard 
                key={state.id} 
                state={state} 
                onClick={setSelectedState} 
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-slate-400 dark:text-white/20 font-black uppercase tracking-[0.5em]">No cultural matches found</p>
        </div>
      )}

      <AnimatePresence>
        {selectedState && (
          <StateDetailsPanel 
            state={selectedState} 
            onClose={() => setSelectedState(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
