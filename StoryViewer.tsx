import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Play, Headset, 
  Share2, Heart, MessageCircle,
  MapPin, Bookmark, Info, ArrowRight,
  Volume2, Maximize, List
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StoryViewer() {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<'read' | 'watch' | 'listen'>('read');

  const story = {
    title: 'The Whispering Banyan of Mysore',
    state: 'Karnataka',
    category: 'Village Legend',
    characters: ['Veera', 'The Elder Banyan', 'Villagers'],
    description: 'A mystical banyan tree near an abandoned temple was believed to protect villagers during times of famine.',
    content: `In the dusty plains near the edge of Mysore, there stood a banyan tree so large its branches seemed to hold up the sky itself. The villagers called it 'The Whispering Mother'. 

Legend has it that during the Great Famine of 1876, while the surrounding lands withered and died, the roots of the Banyan deep within the earth found secret springs of water. But more than water, the tree offered wisdom. 

Young Veera, a boy no older than twelve, was the first to hear it. While resting under its massive shade, he didn't hear the rustle of leaves, but a low, rhythmic hum. As he pressed his ear to the ancient bark, the hum became words...`,
    illustration: 'https://images.unsplash.com/photo-1544168190-79c17527004f?auto=format&fit=crop&q=80&w=1200'
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white font-sans">
       {/* Cinematic Header */}
       <div className="relative h-[60vh] overflow-hidden">
          <img src={story.illustration} className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110 blur-sm" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
          
          <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-8 py-20 flex flex-col items-center text-center space-y-8">
             <div className="flex gap-4">
                <span className="px-4 py-1.5 bg-amber-500 rounded-full text-[10px] font-black uppercase tracking-widest">{story.category}</span>
                <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">{story.state}</span>
             </div>
             <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-7xl font-black tracking-tighter uppercase italic leading-[0.9]"
             >
                {story.title}
             </motion.h1>
             <div className="flex gap-6">
                <button 
                  onClick={() => setActiveMode('read')}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all ${activeMode === 'read' ? 'bg-white text-slate-900 shadow-2xl' : 'bg-white/5 hover:bg-white/10'}`}
                >
                   <Bookmark className="w-5 h-5" />
                   <span className="text-xs font-black uppercase tracking-widest">Read Saga</span>
                </button>
                <button 
                  onClick={() => setActiveMode('watch')}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all ${activeMode === 'watch' ? 'bg-amber-500 text-white shadow-2xl shadow-amber-500/20' : 'bg-white/5 hover:bg-white/10'}`}
                >
                   <Play className="w-5 h-5" />
                   <span className="text-xs font-black uppercase tracking-widest">Watch Film</span>
                </button>
                <button 
                  onClick={() => setActiveMode('listen')}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all ${activeMode === 'listen' ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20' : 'bg-white/5 hover:bg-white/10'}`}
                >
                   <Headset className="w-5 h-5" />
                   <span className="text-xs font-black uppercase tracking-widest">Oral Narration</span>
                </button>
             </div>
          </div>

          <button 
            onClick={() => navigate('/folklore')}
            className="absolute top-12 left-12 p-4 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-all border border-white/10"
          >
             <ChevronLeft className="w-6 h-6" />
          </button>
       </div>

       {/* Content Area */}
       <div className="max-w-4xl mx-auto px-8 py-20">
          <AnimatePresence mode="wait">
             {activeMode === 'read' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                   <div className="flex gap-8 items-start">
                      <div className="w-32 py-10 bg-white/5 border border-white/10 rounded-full flex flex-col items-center gap-8 sticky top-32">
                         <button className="text-white/40 hover:text-rose-500 transition-colors"><Heart className="w-6 h-6" /></button>
                         <button className="text-white/40 hover:text-indigo-400 transition-colors"><MessageCircle className="w-6 h-6" /></button>
                         <button className="text-white/40 hover:text-amber-500 transition-colors"><Share2 className="w-6 h-6" /></button>
                         <div className="h-px w-8 bg-white/10" />
                         <button className="text-white/40 hover:text-white transition-colors"><List className="w-6 h-6" /></button>
                      </div>

                      <article className="flex-1 space-y-8">
                         <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-amber-500/60">
                            <div className="h-px w-8 bg-amber-500/20" />
                            Chapter 01: The Hum of the Soil
                         </div>
                         <div className="text-2xl font-medium leading-relaxed text-slate-100/80 first-letter:text-7xl first-letter:font-black first-letter:text-amber-500 first-letter:float-left first-letter:pr-4 first-letter:uppercase">
                            {story.content}
                         </div>
                      </article>
                   </div>
                </motion.div>
             )}

             {activeMode === 'watch' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="aspect-video bg-black rounded-[48px] overflow-hidden relative shadow-2xl group"
                >
                   <img src="https://images.unsplash.com/photo-1590050752117-23a9d7fc2113?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-50" alt="Video Placeholder" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                         <Play className="w-10 h-10 text-slate-900 fill-current" />
                      </div>
                   </div>
                   <div className="absolute bottom-8 left-8 right-8 flex items-center gap-4">
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full w-1/3 bg-amber-500" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40">04:20 / 12:00</span>
                      <Maximize className="w-4 h-4 text-white/40" />
                   </div>
                </motion.div>
             )}

             {activeMode === 'listen' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 rounded-[64px] p-20 flex flex-col items-center gap-12 text-center"
                >
                   <div className="relative">
                      <div className="absolute -inset-8 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
                      <div className="w-48 h-48 bg-indigo-600 rounded-full flex items-center justify-center relative shadow-2xl">
                         <Volume2 className="w-16 h-16 text-white" />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-2xl font-black uppercase tracking-tighter italic">Narrated by Master Ravi Shenoy</h4>
                      <p className="text-white/40 text-sm font-medium">Recorded live at the Mysore Heritage Archive</p>
                   </div>
                   <div className="w-full max-w-md bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-white" />
                   </div>
                   <div className="flex gap-8">
                      <button className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all">
                         <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button className="w-20 h-20 bg-white text-slate-900 rounded-[28px] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                         <Play className="w-8 h-8 fill-current" />
                      </button>
                      <button className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all rotate-180">
                         <ChevronLeft className="w-6 h-6" />
                      </button>
                   </div>
                </motion.div>
             )}
          </AnimatePresence>
       </div>

       {/* Related Stories */}
       <section className="bg-white/2 py-32 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-8 space-y-12">
             <div className="flex items-end justify-between">
                <div className="space-y-4">
                   <h3 className="text-4xl font-black uppercase tracking-tighter italic">Next in the <span className="text-amber-500">Universe</span></h3>
                   <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">More legends from {story.state}</p>
                </div>
                <button className="p-4 bg-white/5 rounded-2xl text-white/40"><ArrowRight className="w-6 h-6" /></button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="group cursor-pointer space-y-6">
                     <div className="aspect-[16/10] bg-zinc-900 rounded-[32px] overflow-hidden">
                         <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=600`} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt="" />
                     </div>
                     <div className="space-y-2">
                        <span className="text-[8px] font-black uppercase text-amber-500">Village Legend</span>
                        <h4 className="text-xl font-black uppercase italic tracking-tight">The Serpent Guardian</h4>
                        <p className="text-xs text-white/40 font-medium line-clamp-2">The ancient protectors of the Western Ghats emerge from the mist...</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </section>
    </div>
  );
}
