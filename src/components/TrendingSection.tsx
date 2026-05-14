import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { STATES_DATA } from '../data/states';
import { useLanguage } from '../context/LanguageContext';

export default function TrendingSection() {
  const { language, t } = useLanguage();
  const trending = STATES_DATA.slice(0, 4);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-xl">
            <Zap className="w-5 h-5 text-orange-500 fill-orange-500" />
          </div>
          <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">
            {t('trending')}
          </h2>
        </div>
        <div className="flex gap-2">
           <button className="p-3 rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trending.map((state, i) => (
          <motion.div
            key={state.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative h-64 rounded-[32px] overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg"
          >
            <img src={state.image} alt="" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
            <div className={`absolute inset-0 bg-gradient-to-br ${state.gradient} opacity-20`} />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">State Highlights</span>
              <h4 className="text-xl font-black text-white tracking-tighter">{state.name[language]}</h4>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
