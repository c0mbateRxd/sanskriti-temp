import React from 'react';
import { motion } from 'motion/react';
import { 
  Video, Image as ImageIcon, Music, 
  Trash2, Download, Search, Filter, 
  Plus, MoreVertical, FileText, LayoutGrid, List
} from 'lucide-react';

export default function MediaLibrary() {
  const mediaItems = [
    { name: 'Kanchipuram_Process_HD.mp4', type: 'video', size: '240MB', date: 'Oct 12, 2026' },
    { name: 'Tanjore_Reference_01.jpg', type: 'image', size: '4.5MB', date: 'Oct 10, 2026' },
    { name: 'Folk_Background_Score.wav', type: 'audio', size: '12MB', date: 'Oct 09, 2026' },
    { name: 'Story_Outline_Yakshagana.pdf', type: 'doc', size: '1.2MB', date: 'Oct 08, 2026' },
  ];

  return (
    <div className="min-h-screen pt-12 pb-20 px-6 max-w-7xl mx-auto space-y-12">
       <header className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-indigo-500 rounded-full" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Digital Asset Management</p>
             </div>
             <h1 className="text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85] uppercase">
                Media <br /> <span className="text-indigo-500">Vault</span>
             </h1>
          </div>

          <div className="flex gap-4">
             <button className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all">
                <Plus className="w-4 h-4" />
                Upload New
             </button>
          </div>
       </header>

       {/* Toolbar */}
       <section className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[32px] p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search assets..." 
               className="w-full bg-transparent border-none outline-none pl-12 pr-6 py-2 text-sm font-bold"
             />
          </div>
          <div className="h-10 w-px bg-slate-200 dark:bg-white/10 hidden md:block" />
          <div className="flex gap-2">
             <button className="p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all"><Filter className="w-4 h-4 text-slate-400" /></button>
             <button className="p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all"><LayoutGrid className="w-4 h-4 text-slate-400" /></button>
             <button className="p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl transition-all"><List className="w-4 h-4" /></button>
          </div>
       </section>

       {/* Asset List */}
       <section className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px] overflow-hidden">
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead>
                   <tr className="border-b border-slate-100 dark:border-white/5">
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">File Name</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Type</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Size</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Added</th>
                      <th className="px-8 py-6"></th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                   {mediaItems.map((item, i) => (
                     <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-white/2 transition-all">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-xl ${
                                item.type === 'video' ? 'bg-indigo-500/10 text-indigo-500' :
                                item.type === 'image' ? 'bg-rose-500/10 text-rose-500' :
                                item.type === 'audio' ? 'bg-emerald-500/10 text-emerald-500' :
                                'bg-purple-500/10 text-purple-500'
                              }`}>
                                 {item.type === 'video' ? <Video className="w-5 h-5" /> :
                                  item.type === 'image' ? <ImageIcon className="w-5 h-5" /> :
                                  item.type === 'audio' ? <Music className="w-5 h-5" /> :
                                  <FileText className="w-5 h-5" />}
                              </div>
                              <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{item.name}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.type}</span>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.size}</span>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.date}</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-3 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl transition-all"><Download className="w-4 h-4 text-slate-400" /></button>
                              <button className="p-3 hover:bg-rose-500 hover:text-white rounded-xl transition-all text-rose-500"><Trash2 className="w-4 h-4" /></button>
                              <button className="p-3 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl transition-all"><MoreVertical className="w-4 h-4 text-slate-400" /></button>
                           </div>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </section>

       {/* Cloud Storage Usage */}
       <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-indigo-600 rounded-[48px] p-10 text-white flex flex-col justify-between gap-8 h-full">
             <div className="space-y-4">
                <h4 className="text-2xl font-black uppercase tracking-tighter leading-none italic">Storage <br /> Optimization</h4>
                <p className="text-white/60 font-medium text-sm">Your AI Assistant has compressed 12 videos, saving 4.5GB of cloud space this month.</p>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <p className="text-3xl font-black italic">64%</p>
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-40">12.8GB / 20GB Used</p>
                </div>
                <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                   <div className="w-[64%] h-full bg-white" />
                </div>
             </div>
          </div>

          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px] p-10 space-y-6">
             <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Content <span className="text-indigo-500">Cleanup</span></h4>
             <p className="text-xs text-slate-400 dark:text-white/20 font-black uppercase tracking-widest leading-loose">We found 4 duplicate videos in your vault. Would you like to merge them?</p>
             <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all">Merge Assets</button>
          </div>
       </section>
    </div>
  );
}
