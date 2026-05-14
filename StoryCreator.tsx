import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Save, Share2, Sparkles, BookOpen, 
  Image as ImageIcon, Music, Type, Plus,
  ChevronLeft, Layout, Send, Headphones
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StoryCreator() {
  const navigate = useNavigate();
  const [activeStage, setActiveStage] = useState<'write' | 'visuals' | 'publish'>('write');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
       {/* Top Navigation */}
       <div className="h-24 px-8 flex items-center justify-between border-b border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900 sticky top-0 z-[100]">
          <button 
             onClick={() => navigate('/folklore')}
             className="flex items-center gap-3 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all uppercase text-[10px] font-black tracking-widest"
          >
             <ChevronLeft className="w-5 h-5" />
             Back to Universe
          </button>

          <div className="flex gap-2">
             {['write', 'visuals', 'publish'].map((stage) => (
                <button
                  key={stage}
                  onClick={() => setActiveStage(stage as any)}
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeStage === stage 
                      ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/20' 
                      : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                   {stage}
                </button>
             ))}
          </div>

          <div className="flex gap-4">
             <button className="p-4 bg-slate-100 dark:bg-white/5 text-slate-400 rounded-2xl hover:text-slate-900 transition-all">
                <Save className="w-5 h-5" />
             </button>
             <button className="flex items-center gap-3 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                Preview Saga
             </button>
          </div>
       </div>

       <div className="max-w-6xl mx-auto py-12 px-6">
          <AnimatePresence mode="wait">
             {activeStage === 'write' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                   <div className="space-y-4">
                      <input 
                         type="text" 
                         placeholder="The Title of Your Legend..." 
                         className="w-full bg-transparent text-7xl font-black tracking-tighter text-slate-900 dark:text-white outline-none placeholder:text-slate-200 dark:placeholder:text-white/5 uppercase italic"
                      />
                      <div className="flex gap-6">
                         <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                            <span className="text-[10px] font-black uppercase text-slate-400">STATE:</span>
                            <select className="bg-transparent text-[10px] font-black uppercase text-slate-900 dark:text-white outline-none">
                               <option>Karnataka</option>
                               <option>Rajasthan</option>
                               <option>Tamil Nadu</option>
                            </select>
                         </div>
                         <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                            <span className="text-[10px] font-black uppercase text-slate-400">CATEGORY:</span>
                            <select className="bg-transparent text-[10px] font-black uppercase text-slate-900 dark:text-white outline-none">
                               <option>Village Legend</option>
                               <option>Ghost Story</option>
                               <option>Nature Myth</option>
                            </select>
                         </div>
                      </div>
                   </div>

                   {/* Editor Area */}
                   <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[48px] p-12 min-h-[600px] shadow-2xl relative">
                      <div className="absolute top-10 right-10">
                         <button className="flex items-center gap-3 px-6 py-3 bg-amber-500/10 text-amber-500 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-500 hover:text-white transition-all shadow-xl">
                            <Sparkles className="w-4 h-4" />
                            AI Helper
                         </button>
                      </div>
                      
                      <textarea 
                         placeholder="Once in a land where the rivers sang..." 
                         className="w-full h-full bg-transparent text-xl font-medium text-slate-700 dark:text-white/60 outline-none resize-none placeholder:text-slate-200 dark:placeholder:text-white/5 leading-relaxed"
                      />
                   </div>
                </motion.div>
             )}

             {activeStage === 'visuals' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                   <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[48px] p-12 space-y-12">
                      <div className="space-y-4">
                         <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Story <span className="text-amber-500">Aesthetics</span></h3>
                         <p className="text-sm text-slate-500 dark:text-white/40">Upload or generate cultural illustrations for your saga.</p>
                      </div>

                      <div className="aspect-[4/3] bg-slate-100 dark:bg-white/2 rounded-[32px] border-4 border-dashed border-slate-200 dark:border-white/5 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-slate-200 dark:hover:bg-white/5 transition-all">
                         <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl">
                            <ImageIcon className="w-8 h-8 text-slate-400 group-hover:text-amber-500 transition-colors" />
                         </div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Drop your illustration or click to generate</p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         <button className="flex items-center justify-center gap-3 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105">
                            <Sparkles className="w-4 h-4" />
                            AI Image Gen
                         </button>
                         <button className="flex items-center justify-center gap-3 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
                            <Plus className="w-4 h-4" />
                            Add Chapter Cover
                         </button>
                      </div>
                   </div>

                   <div className="bg-indigo-600 rounded-[48px] p-12 text-white space-y-12 flex flex-col justify-center">
                      <div className="space-y-6">
                         <h3 className="text-4xl font-black uppercase tracking-tighter leading-none italic">Immersive <br /> Audio Narration</h3>
                         <p className="text-white/60 font-medium leading-relaxed">Add a traditional background score or record your voice narration to bring the legend to life.</p>
                      </div>
                      
                      <div className="space-y-4">
                         <button className="w-full flex items-center justify-between p-6 bg-white/10 border border-white/20 rounded-3xl hover:bg-white/20 transition-all group">
                            <div className="flex items-center gap-4">
                               <div className="p-3 bg-white/10 rounded-xl">
                                  <Music className="w-5 h-5" />
                               </div>
                               <span className="text-sm font-black uppercase tracking-widest">Atmospheric Music</span>
                            </div>
                            <Plus className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                         </button>
                         <button className="w-full flex items-center justify-between p-6 bg-white/10 border border-white/20 rounded-3xl hover:bg-white/20 transition-all group">
                            <div className="flex items-center gap-4">
                               <div className="p-3 bg-white/10 rounded-xl">
                                  <Headphones className="w-5 h-5" />
                               </div>
                               <span className="text-sm font-black uppercase tracking-widest">Voice Recording</span>
                            </div>
                            <Plus className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                         </button>
                      </div>
                   </div>
                </motion.div>
             )}
          </AnimatePresence>
       </div>

       {/* Floating Tool Dock */}
       <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[32px] shadow-2xl z-[200]"
       >
          <button className="p-4 text-slate-400 hover:text-amber-500 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all"><Type className="w-5 h-5" /></button>
          <button className="p-4 text-slate-400 hover:text-indigo-500 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all"><Layout className="w-5 h-5" /></button>
          <button className="p-4 text-slate-400 hover:text-rose-500 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all"><ImageIcon className="w-5 h-5" /></button>
          <div className="h-4 w-px bg-slate-200 mx-2" />
          <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl">
              <Send className="w-4 h-4" />
              Publish Saga
          </button>
       </motion.div>
    </div>
  );
}
