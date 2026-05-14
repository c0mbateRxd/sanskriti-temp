import React from 'react';
import { motion } from 'motion/react';
import { Award, Target, Flame, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { STATES_DATA } from '../data/states';
import { useLanguage } from '../context/LanguageContext';

export default function ProgressTracker() {
  const { exploredStates, streak } = useUser();
  const { t } = useLanguage();
  
  const totalStates = STATES_DATA.length;
  const exploredCount = exploredStates.length;
  const progressPercent = Math.round((exploredCount / totalStates) * 100);

  const badges = [
    { id: 'early', icon: Award, label: 'Early Explorer', unlocked: exploredCount >= 1 },
    { id: 'heritage', icon: Target, label: 'Heritage Hunter', unlocked: exploredCount >= 3 },
    { id: 'cultural', icon: Flame, label: 'Cultural Veteran', unlocked: exploredCount >= 5 },
    { id: 'master', icon: TrendingUp, label: 'Bharat Guru', unlocked: exploredCount >= 10 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Progress Bar */}
      <div className="md:col-span-2 bg-white dark:bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-slate-200 dark:border-white/10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">{t('my_progress')}</h3>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white/30 mt-1">Cultural Journey Data</p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-black tracking-tighter text-orange-500">{progressPercent}%</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative h-6 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 p-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            />
          </div>
          
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20">Explored</p>
                <p className="text-sm font-black text-slate-900 dark:text-white">{exploredCount} / {totalStates}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                <Flame className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20">Daily Streak</p>
                <p className="text-sm font-black text-slate-900 dark:text-white">{streak} Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-slate-200 dark:border-white/10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">{t('badges')}</h3>
          <span className="bg-orange-500/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-orange-500">{badges.filter(b => b.unlocked).length} UNLOCKED</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge) => (
            <div 
              key={badge.id}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-500 ${
                badge.unlocked 
                  ? 'bg-orange-500/10 border-orange-500/20 cursor-default' 
                  : 'bg-slate-50 dark:bg-white/2 opacity-20 grayscale border-transparent cursor-not-allowed'
              }`}
            >
              <badge.icon className={`w-6 h-6 mb-2 ${badge.unlocked ? 'text-orange-500' : 'text-slate-400 dark:text-white/20'}`} />
              <span className="text-[8px] font-black uppercase tracking-widest text-center leading-tight">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
