import React from 'react';
import { motion } from 'motion/react';
import { X, MapPin, Music, Shirt, Palette, Info, CheckCircle, Share2 } from 'lucide-react';
import { StateCulture } from '../data/states';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

interface StateDetailsPanelProps {
  state: StateCulture;
  onClose: () => void;
}

export default function StateDetailsPanel({ state, onClose }: StateDetailsPanelProps) {
  const { language, t } = useLanguage();
  const { toggleExplored, isStateExplored } = useUser();
  const explored = isStateExplored(state.id);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/40 dark:bg-black/60 backdrop-blur-sm"
      />

      {/* Side Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-2xl h-full bg-white dark:bg-zinc-950 shadow-2xl overflow-y-auto"
      >
        {/* Header Hero */}
        <div className="relative h-96 group">
          <img 
            src={state.image} 
            alt={state.name[language]} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-transparent to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-6 left-6 p-3 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-12 left-12 right-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-orange-500 rounded-full text-[10px] font-black uppercase tracking-wider text-white">
                  {state.category}
                </span>
                <span className="flex items-center gap-1.5 text-orange-500 dark:text-orange-400 font-bold bg-orange-500/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
                  <MapPin className="w-3 h-3" />
                  India Territory
                </span>
              </div>
              <h2 className="text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-2">
                {state.name[language]}
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="px-12 py-8 space-y-12">
          {/* Action Row */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleExplored(state.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all ${
                explored
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/20 cursor-default'
                  : 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:scale-[1.02]'
              }`}
            >
              {explored ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Explored & Saved
                </>
              ) : (
                'Mark as Explored'
              )}
            </button>
            <button className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/40 hover:text-orange-500 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Cultural Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-3xl border border-slate-100 dark:border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20 mb-1">{t('dance')}</p>
                <p className="text-lg font-black tracking-tight text-slate-900 dark:text-white">{state.dance}</p>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-3xl border border-slate-100 dark:border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20 mb-1">{t('textile')}</p>
                <p className="text-lg font-black tracking-tight text-slate-900 dark:text-white">{state.textile}</p>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-3xl border border-slate-100 dark:border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20 mb-1">{t('art')}</p>
                <p className="text-lg font-black tracking-tight text-slate-900 dark:text-white">{state.art}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-400 dark:text-white/20">
              <Info className="w-4 h-4" />
              <p className="text-[10px] font-black uppercase tracking-widest leading-none">{t('description')}</p>
            </div>
            <p className="text-lg text-slate-600 dark:text-white/60 leading-relaxed font-medium">
              {state.description[language]}
            </p>
          </div>

          <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-white/5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/20">{t('tags')}</p>
            <div className="flex flex-wrap gap-2">
              {state.tags.map(tag => (
                <span key={tag} className="px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-full text-xs font-bold text-slate-600 dark:text-white/60 border border-slate-100 dark:border-white/10">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
