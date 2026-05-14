import React from 'react';
import { motion } from 'motion/react';
import { 
  Video, Play, Image as ImageIcon, Music, 
  BarChart3, Plus, Settings, Sparkles, 
  Upload, Layers, Subtitles, Share2, 
  Eye, Heart, MessageCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CreatorDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Views', val: '45.2k', icon: Eye, color: 'text-blue-500' },
    { label: 'Cloud Space', val: '64%', icon: Layers, color: 'text-purple-500' },
    { label: 'Engagement', val: '8.4%', icon: BarChart3, color: 'text-emerald-500' },
    { label: 'Subscribers', val: '1.2k', icon: Share2, color: 'text-rose-500' },
  ];

  const recentContent = [
    { title: 'The Making of Kanchipuram Silk', type: 'Video', status: 'Published', views: '2.1k' },
    { title: 'Folklore: The Whispering Tree', type: 'Story', status: 'Draft', views: '-' },
    { title: 'Daily Craft Session #4', type: 'Live', status: 'Recorded', views: '840' },
  ];

  return (
    <div className="min-h-screen pt-12 pb-20 px-6 max-w-[1600px] mx-auto space-y-12">
       {/* Header */}
       <header className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-indigo-500 rounded-full" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Creator Intelligence Studio</p>
             </div>
             <h1 className="text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85] uppercase">
                Story <br /> <span className="text-zinc-300 dark:text-white/10 italic">Engine</span>
             </h1>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all">
               <Plus className="w-5 h-5" />
               New Creation
            </button>
            <button className="p-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[32px] text-slate-400">
               <Settings className="w-6 h-6" />
            </button>
          </div>
       </header>

       {/* Stats Grid */}
       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
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
          {/* Main Workspace Area */}
          <div className="lg:col-span-8 space-y-12">
             {/* Studio Tools */}
             <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px] p-10 space-y-8">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Studio <span className="text-indigo-500">Toolkit</span></h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                   {[
                     { label: 'Video Editor', icon: Video, color: 'bg-indigo-500/10 text-indigo-500', path: '/creator/video-editor' },
                     { label: 'Folklore Lab', icon: Play, color: 'bg-amber-500/10 text-amber-500', path: '/folklore/create' },
                     { label: 'Asset Vault', icon: Music, color: 'bg-rose-500/10 text-rose-500', path: '/creator/vault' },
                     { label: 'AI Studio', icon: Subtitles, color: 'bg-emerald-500/10 text-emerald-500', path: '/creator/ai-lab' },
                   ].map((tool, i) => (
                     <div 
                        key={i} 
                        onClick={() => navigate(tool.path)}
                        className="group p-6 bg-slate-50 dark:bg-white/2 rounded-[32px] text-center space-y-4 hover:bg-slate-900 dark:hover:bg-white transition-all cursor-pointer"
                     >
                        <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center ${tool.color} group-hover:bg-white/10`}>
                           <tool.icon className="w-7 h-7" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white group-hover:text-white dark:group-hover:text-slate-900">{tool.label}</p>
                     </div>
                   ))}
                </div>
             </div>

             {/* Recent Content Table */}
             <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px] p-10 space-y-8">
                <div className="flex items-center justify-between">
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Content <span className="text-zinc-300 dark:text-white/10">Vault</span></h3>
                   <button className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:underline">View All &rarr;</button>
                </div>
                
                <div className="space-y-4">
                   {recentContent.map((item, i) => (
                     <div key={i} className="p-6 bg-slate-50 dark:bg-white/2 rounded-3xl border border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-10 bg-slate-200 dark:bg-white/10 rounded-xl overflow-hidden">
                              {/* Thumbnail placeholder */}
                           </div>
                           <div>
                              <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{item.title}</h4>
                              <div className="flex items-center gap-3 mt-1">
                                 <span className="text-[8px] font-black uppercase text-indigo-500">{item.type}</span>
                                 <span className="text-[8px] font-black uppercase text-slate-400">&bull; {item.views} Views</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                             item.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                           }`}>
                              {item.status}
                           </span>
                           <button className="p-2 text-slate-400">
                              <BarChart3 className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Right Sidebar: AI Assistant & Live Preview */}
          <div className="lg:col-span-4 space-y-8">
             <div className="bg-indigo-600 rounded-[48px] p-10 text-white space-y-8 relative overflow-hidden group">
                <Sparkles className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                <div className="relative z-10 space-y-6">
                   <h4 className="text-3xl font-black uppercase tracking-tighter leading-none italic">AI Cultural <br /> Director</h4>
                   <p className="text-sm font-medium text-white/60 italic leading-relaxed">
                      "I've analyzed trending cultural themes. Focus on 'Pochampally Weaving' this week—searches are up 40% in Western markets."
                   </p>
                   <div className="pt-4 flex flex-col gap-3">
                      <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-slate-50 transition-all">
                         Generate Script
                      </button>
                      <button className="w-full py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/20 transition-all">
                         AI Thumbnail
                      </button>
                   </div>
                </div>
             </div>

             <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px] p-10 space-y-8">
                <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Live <span className="text-rose-500">Studio</span></h4>
                <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden relative group cursor-pointer">
                   <div className="absolute top-4 left-4 flex items-center gap-2">
                       <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                       <span className="text-[8px] font-black text-white uppercase tracking-widest">Broadcast Ready</span>
                   </div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <button className="p-6 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 group-hover:scale-110 transition-transform">
                         <Plus className="w-8 h-8" />
                      </button>
                   </div>
                </div>
                <button className="w-full py-5 bg-rose-500 text-white rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all">
                   Go Live Now
                </button>
             </div>
          </div>
       </div>
    </div>
  );
}
