import React from 'react';
import { motion } from 'motion/react';
import { 
  LogOut, Award, BookOpen, Clock, Heart, 
  ChevronRight, Star, TrendingUp, Search, GraduationCap, Sparkles, Book, Video
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const { user, profile, logout } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="space-y-6">
           <Award className="w-16 h-16 mx-auto text-slate-200 dark:text-white/5" />
           <p className="text-xl font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.4em]">Initialize Authentication Vault</p>
           <button 
             onClick={() => navigate('/')} 
             className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px]"
           >
             Return Home
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 pb-20 px-6 max-w-[1600px] mx-auto space-y-12">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="h-1 w-12 bg-indigo-500 rounded-full" />
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Student Intelligence Hub</p>
          </div>
          <h1 className="text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85] uppercase">
            Namaste, <br /> <span className="text-indigo-500">{user.displayName?.split(' ')[0]}</span>
          </h1>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/folklore')}
            className="flex items-center gap-3 px-8 py-4 bg-amber-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
             <Book className="w-4 h-4" />
             Folklore Universe
          </button>
          <button 
            onClick={() => navigate('/creator-dashboard')}
            className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
             <Video className="w-4 h-4" />
             Creator Studio
          </button>
          <button 
            onClick={() => logout()}
            className="p-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl text-slate-400 hover:text-rose-500 transition-all"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Classes Enrolled', val: profile?.enrolledClasses?.length || 0, icon: BookOpen, color: 'text-blue-500' },
          { label: 'Learning Hours', val: '12h', icon: Clock, color: 'text-amber-500' },
          { label: 'Achievements', val: profile?.achievements?.length || 0, icon: Award, color: 'text-purple-500' },
          { label: 'Avg Skill Level', val: 'Lvl 4', icon: TrendingUp, color: 'text-emerald-500' },
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
        {/* Enrolled Classes */}
        <div className="lg:col-span-8 space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Active <span className="text-indigo-500">Mentorships</span></h3>
              <button onClick={() => navigate('/mentors')} className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:underline">Explore More &rarr;</button>
           </div>

           <div className="space-y-4">
              {profile?.enrolledClasses?.length === 0 ? (
                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px] p-10 space-y-6">
                   <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-indigo-500/10 rounded-[28px] flex items-center justify-center text-indigo-500">
                            <GraduationCap className="w-8 h-8" />
                         </div>
                         <div className="space-y-1">
                            <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">Tanjore Painting <span className="text-indigo-500">Masterclass</span></h4>
                            <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest">Ongoing Mentorship &bull; Meera Krishnan</p>
                         </div>
                      </div>
                      <div className="flex gap-3">
                         <button 
                           onClick={() => navigate('/live-session')}
                           className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all"
                         >
                            Join Room
                         </button>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px] p-8">
                   {/* Map over enrolled classes here */}
                </div>
              )}
           </div>

           {/* Achievements */}
           <div className="space-y-8">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Cultural <span className="text-purple-500">Achievements</span></h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                 {['Beginner Weaver', 'Folk Dancer', 'Artisan Appreciator', 'State Explorer'].map(badge => (
                   <div key={badge} className="bg-slate-50 dark:bg-white/2 p-6 rounded-[32px] text-center space-y-3 grayscale hover:grayscale-0 transition-all cursor-pointer">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-2xl mx-auto flex items-center justify-center text-purple-500">
                        <Award className="w-6 h-6" />
                      </div>
                      <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest leading-tight">{badge}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Sidebar: Wishlist & Recommendations */}
        <div className="lg:col-span-4 space-y-12">
           <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px] p-10 space-y-8">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase italic">My <span className="text-rose-500">Wishlist</span></h4>
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>

              <div className="space-y-4">
                 {(profile?.wishlist?.length || 0) === 0 ? (
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center py-10">Vault is empty</p>
                 ) : (
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center py-10">{profile?.wishlist.length} items saved</p>
                 )}
              </div>
           </div>

           <div className="bg-indigo-600 rounded-[48px] p-10 text-white space-y-6 relative overflow-hidden group">
              <Sparkles className="absolute top-10 right-10 w-20 h-20 text-white/10 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 space-y-6">
                <h4 className="text-2xl font-black uppercase tracking-tighter leading-none italic">AI Recommended <br /> Paths</h4>
                <p className="text-sm font-medium text-white/60">Based on your interest in Textile Art, we suggest learning from Ranganathan S. in Tamil Nadu.</p>
                <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl">
                  View Path
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
