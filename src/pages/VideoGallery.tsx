import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Heart, MessageSquare, Share2, 
  MoreVertical, Search, Filter, Clock, 
  Eye, User
} from 'lucide-react';

export default function VideoGallery() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Tutorials', 'Performances', 'Masterclasses', 'Cultural Vlogs'];

  const videos = [
    { id: 1, title: 'Basics of Bharatnatyam Hand Gestures', artist: 'Meera Krishnan', views: '2.4k', likes: 120, thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600', category: 'Tutorials', time: '12:45' },
    { id: 2, title: 'Pochampally Ikat Weaving Process', artist: 'Raju Weaver', views: '1.2k', likes: 85, thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600', category: 'Masterclasses', time: '25:10' },
    { id: 3, title: 'Evening Kathakali Performance at Temple', artist: 'Ravi M.', views: '5.6k', likes: 450, thumbnail: 'https://images.unsplash.com/photo-1590050752117-23a9d7fc2113?auto=format&fit=crop&q=80&w=600', category: 'Performances', time: '45:00' },
    { id: 4, title: 'Understanding Tanjore Gold Application', artist: 'Meera Krishnan', views: '1.8k', likes: 95, thumbnail: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=600', category: 'Tutorials', time: '15:20' }
  ];

  const filteredVideos = activeCategory === 'All' ? videos : videos.filter(v => v.category === activeCategory);

  return (
    <div className="min-h-screen pt-12 pb-20 px-6 max-w-[1600px] mx-auto space-y-12">
       <header className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-indigo-500 rounded-full" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Bharat Video Archives</p>
             </div>
             <h1 className="text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85] uppercase">
                Visual <br /> <span className="text-zinc-300 dark:text-white/10 italic">Heritage</span>
             </h1>
          </div>

          <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
             {categories.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                   activeCategory === cat 
                     ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                     : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/40'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
       </header>

       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
             {filteredVideos.map((video, i) => (
               <motion.div
                 layout
                 key={video.id}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.05 }}
                 className="group space-y-4 cursor-pointer"
               >
                  <div className="aspect-video relative rounded-[40px] overflow-hidden bg-slate-100 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                     <img src={video.thumbnail} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                     
                     <div className="absolute top-6 left-6">
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/20">
                           {video.category}
                        </span>
                     </div>

                     <div className="absolute bottom-6 right-6">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[8px] font-black text-white uppercase tracking-widest">
                           {video.time}
                        </span>
                     </div>

                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="p-6 bg-white text-slate-900 rounded-full shadow-2xl">
                           <Play className="w-8 h-8 fill-current" />
                        </div>
                     </div>
                  </div>

                  <div className="px-2 space-y-2">
                     <div className="flex justify-between items-start">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight uppercase line-clamp-2 tracking-tight">
                           {video.title}
                        </h3>
                        <button className="p-2 text-slate-400 group-hover:text-slate-900 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                     </div>

                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                              <User className="w-3 h-3 text-slate-400" />
                           </div>
                           <p className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest">{video.artist}</p>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                           <Eye className="w-3 h-3" />
                           <p className="text-[9px] font-black uppercase">{video.views}</p>
                        </div>
                     </div>
                  </div>
               </motion.div>
             ))}
          </AnimatePresence>
       </div>
    </div>
  );
}
