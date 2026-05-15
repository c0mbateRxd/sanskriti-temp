import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { MapPin, CheckCircle2, Lock, Trophy, Star, TrendingUp } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { STATES_DATA } from '../data/states';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const MILESTONES = [
  { count: 1, label: 'First Step', icon: '🌱', color: 'text-emerald-500' },
  { count: 5, label: 'Explorer', icon: '🗺️', color: 'text-blue-500' },
  { count: 10, label: 'Heritage Hunter', icon: '🏛️', color: 'text-amber-500' },
  { count: 15, label: 'Cultural Veteran', icon: '⚔️', color: 'text-rose-500' },
  { count: 20, label: 'Bharat Scholar', icon: '📚', color: 'text-purple-500' },
  { count: 28, label: 'Bharat Guru', icon: '🏆', color: 'text-orange-500' },
];

export default function Roadmap() {
  const { exploredStates, toggleExplored } = useUser();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const totalStates = STATES_DATA.length;
  const exploredCount = exploredStates.length;
  const progressPercent = Math.round((exploredCount / totalStates) * 100);

  const nextMilestone = useMemo(() => {
    return MILESTONES.find(m => m.count > exploredCount) || MILESTONES[MILESTONES.length - 1];
  }, [exploredCount]);

  const unlockedMilestones = MILESTONES.filter(m => exploredCount >= m.count);

  return (
    <div className="min-h-screen pt-12 pb-20 px-6 max-w-6xl mx-auto space-y-16">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 bg-orange-500 rounded-full" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Your Cultural Journey</p>
        </div>
        <h1 className="text-7xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Heritage <br /><span className="text-orange-500 italic">Roadmap</span></h1>
        <p className="text-slate-500 dark:text-white/40 font-medium">Track every state you have explored. Unlock milestones as you journey through Bharat.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Overall Progress</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{exploredCount} of {totalStates} states explored</p>
            </div>
            <span className="text-5xl font-black text-orange-500">{progressPercent}%</span>
          </div>
          <div className="relative h-6 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 p-1">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 1.5, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-500 rounded-full shadow-lg" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-black text-slate-400 uppercase tracking-widest text-[10px]">0 States</span>
            <div className="flex items-center gap-2 text-orange-500">
              <TrendingUp className="w-4 h-4" />
              <span className="font-black text-[10px] uppercase tracking-widest">Next: {nextMilestone.label} at {nextMilestone.count} states</span>
            </div>
            <span className="font-black text-slate-400 uppercase tracking-widest text-[10px]">{totalStates} States</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-rose-600 rounded-[40px] p-8 text-white space-y-4">
          <Trophy className="w-10 h-10" />
          <h4 className="text-2xl font-black uppercase tracking-tighter leading-none">{unlockedMilestones.length > 0 ? unlockedMilestones[unlockedMilestones.length - 1].label : 'Not Started'}</h4>
          <p className="text-white/60 text-sm font-medium">Current rank</p>
          <div className="text-4xl">{unlockedMilestones.length > 0 ? unlockedMilestones[unlockedMilestones.length - 1].icon : '🌑'}</div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">Milestones</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {MILESTONES.map((milestone) => {
            const unlocked = exploredCount >= milestone.count;
            return (
              <div key={milestone.count} className={`p-6 rounded-[32px] border text-center space-y-3 transition-all ${unlocked ? 'bg-white dark:bg-white/5 border-orange-500/30 shadow-xl' : 'bg-slate-50 dark:bg-white/2 border-slate-200 dark:border-white/5 opacity-40 grayscale'}`}>
                <div className="text-4xl">{milestone.icon}</div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-900 dark:text-white leading-tight">{milestone.label}</p>
                <p className={`text-[8px] font-black uppercase tracking-widest ${unlocked ? 'text-orange-500' : 'text-slate-400'}`}>{milestone.count} States</p>
                {unlocked ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" /> : <Lock className="w-4 h-4 text-slate-300 dark:text-white/10 mx-auto" />}
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">All States</h2>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-500">Explored</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-white/10" />
              <span className="text-slate-500">Not yet</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {STATES_DATA.map((state, i) => {
            const explored = exploredStates.includes(state.id);
            return (
              <motion.div key={state.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className={`group relative rounded-[32px] overflow-hidden cursor-pointer border-2 transition-all duration-300 ${explored ? 'border-emerald-500 shadow-xl shadow-emerald-500/10' : 'border-slate-200 dark:border-white/10 hover:border-orange-500/50'}`}>
                <div className="relative h-40 overflow-hidden">
                  <img src={state.image} alt={state.name[language]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {explored && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-white font-black uppercase tracking-tight text-lg leading-none">{state.name[language]}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-white/60" />
                      <p className="text-[9px] text-white/60 font-bold uppercase tracking-widest">{state.category}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-white/5 space-y-3">
                  <div className="flex gap-2 text-[8px] font-black uppercase tracking-widest">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-lg text-slate-500 dark:text-white/40">{state.dance}</span>
                    <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-lg text-slate-500 dark:text-white/40">{state.art}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleExplored(state.id)} className={`flex-1 py-2.5 rounded-xl font-black uppercase tracking-widest text-[9px] transition-all ${explored ? 'bg-emerald-500 text-white' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105'}`}>
                      {explored ? '✓ Explored' : 'Mark Explored'}
                    </button>
                    <button onClick={() => navigate('/discover')} className="px-3 py-2.5 bg-orange-500/10 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white transition-all">
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}