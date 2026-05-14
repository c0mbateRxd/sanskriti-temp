import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, BarChart3, Calendar, Video, 
  Plus, Settings, DollarSign, MessageCircle, 
  Play, BookOpen, Radio, Sparkles, RefreshCcw, Check
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { seedMentors } from '../services/dataSeeder';

export default function MentorDashboard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSyncData = async () => {
    setIsSeeding(true);
    try {
      await seedMentors();
      setSeedStatus('success');
      setTimeout(() => setSeedStatus('idle'), 3000);
    } catch (error) {
      setSeedStatus('error');
      setTimeout(() => setSeedStatus('idle'), 3000);
    } finally {
      setIsSeeding(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-black text-slate-400">Mentor Authentication Required</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 pb-20 px-6 max-w-[1600px] mx-auto space-y-12">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="h-1 w-12 bg-amber-500 rounded-full" />
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600">Master Artisan Portal</p>
          </div>
          <h1 className="text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85] uppercase">
            Artist <br /> <span className="text-amber-500">Workspace</span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-4 justify-end">
          <button 
             onClick={handleSyncData}
             disabled={isSeeding}
             className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl transition-all ${
               seedStatus === 'success' ? 'bg-emerald-500 text-white' : 
               seedStatus === 'error' ? 'bg-rose-500 text-white' :
               'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105'
             }`}
          >
             {isSeeding ? <RefreshCcw className="w-4 h-4 animate-spin" /> : 
              seedStatus === 'success' ? <Check className="w-4 h-4" /> : 
              <RefreshCcw className="w-4 h-4" />}
             {isSeeding ? 'Syncing...' : seedStatus === 'success' ? 'Cloud Synced' : 'Sync Cloud Data'}
          </button>
          <button 
             onClick={() => navigate('/creator-dashboard')}
             className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all"
          >
             <Sparkles className="w-4 h-4" />
             Creator Hub
          </button>
          <button 
            onClick={() => navigate('/live/studio')}
            className="flex items-center gap-3 px-8 py-4 bg-rose-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all"
          >
             <Radio className="w-4 h-4" />
             Go Live
          </button>
          <button 
             onClick={() => navigate('/dashboard')}
             className="flex items-center gap-3 px-8 py-4 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:text-slate-900 dark:hover:text-white transition-all"
          >
             Back to Learner View
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Students', val: '142', icon: Users, color: 'text-blue-500' },
          { label: 'Total Earnings', val: '₹42.5k', icon: DollarSign, color: 'text-emerald-500' },
          { label: 'Avg Rating', val: '4.9', icon: BarChart3, color: 'text-amber-500' },
          { label: 'Active Sessions', val: '4', icon: Calendar, color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-[40px] space-y-4">
             <div className={`p-4 rounded-2xl bg-slate-50 dark:bg-white/5 w-fit ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
             </div>
             <div>
                <p className="text-3xl font-black text-slate-900 dark:text-white">{stat.val}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20">{stat.label}</p>
             </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Upcoming Sessions & Student Activity */}
        <div className="lg:col-span-8 space-y-12">
           <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px] p-10 space-y-8">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Upcoming <span className="text-amber-500">Live Sessions</span></h3>
              <div className="space-y-6">
                 {[
                   { title: 'Bharatanatyam Masterclass', date: 'Tomorrow, 10 AM', students: 8 },
                   { title: 'Temple Painting Basics', date: 'Wed 15th, 4 PM', students: 12 }
                 ].map((session, i) => (
                   <div key={i} className="p-8 bg-slate-50 dark:bg-white/2 rounded-[32px] border border-slate-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-6">
                         <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                            <Video className="w-7 h-7" />
                         </div>
                         <div className="space-y-1">
                            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">{session.title}</h4>
                            <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest">{session.date} &bull; {session.students} Enrolled</p>
                         </div>
                      </div>
                      <div className="flex gap-2">
                         <button 
                           onClick={() => navigate('/live-session')}
                           className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black uppercase tracking-widest text-[8px]"
                         >
                           Launch Session
                         </button>
                         <button className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-400"><Settings className="w-4 h-4" /></button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px] p-10 space-y-8">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">My <span className="text-blue-500">Tutorial Vault</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {[1, 2].map(i => (
                   <div key={i} className="group relative aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100">
                      <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/60 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <Play className="w-10 h-10 text-white fill-current opacity-80 group-hover:scale-110 transition-transform" />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right: Student Chat & Reviews */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px] p-10 h-[600px] flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Student <span className="text-indigo-500">Queries</span></h4>
                <div className="px-2 py-1 bg-indigo-500 text-white rounded-md text-[8px] font-black uppercase">3 New</div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                 {[
                   { name: 'Aditya Gupta', msg: 'Sir, what type of wood is best for toys?', time: '12m ago' },
                   { name: 'Shreya Iyer', msg: 'Can we record the next session?', time: '2h ago' }
                 ].map((chat, i) => (
                   <div key={i} className="p-4 bg-slate-50 dark:bg-white/2 rounded-2xl border border-slate-100 dark:border-white/5 space-y-2">
                      <div className="flex justify-between items-center">
                         <p className="text-xs font-black text-slate-900 dark:text-white uppercase">{chat.name}</p>
                         <p className="text-[8px] font-bold text-slate-400">{chat.time}</p>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-white/40 font-medium line-clamp-2">{chat.msg}</p>
                   </div>
                 ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                 <button className="w-full py-4 bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2">
                   <MessageCircle className="w-4 h-4" />
                   Open Chat Room
                 </button>
              </div>
           </div>

           <div className="bg-amber-600 rounded-[48px] p-10 text-white space-y-6">
              <h4 className="text-2xl font-black uppercase tracking-tighter leading-none italic">Reach <br /> 500 Students</h4>
              <p className="text-sm font-medium text-white/60">Unlock the 'Cultural Ambassador' badge by hosting 5 more live workshops this month.</p>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                 <div className="w-[60%] h-full bg-white" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
