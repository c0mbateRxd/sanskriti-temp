import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Heart, MoreVertical, 
  Eye, User, X
} from 'lucide-react';

const videos = [
  { 
    id: 1, 
    title: 'Basics of Bharatnatyam Hand Gestures', 
    artist: 'Meera Krishnan', 
    views: '2.4k', 
    likes: 120, 
    thumbnail: 'https://img.youtube.com/vi/KQetemT1sWc/hqdefault.jpg',
    youtubeId: 'KQetemT1sWc',
    category: 'Tutorials', 
    time: '12:45' 
  },
  { 
    id: 2, 
    title: 'Pochampally Ikat Weaving Process', 
    artist: 'Raju Weaver', 
    views: '1.2k', 
    likes: 85, 
    thumbnail: 'https://img.youtube.com/vi/7LQKW5HhJMg/hqdefault.jpg',
    youtubeId: '7LQKW5HhJMg',
    category: 'Masterclasses', 
    time: '25:10' 
  },
  { 
    id: 3, 
    title: 'Evening Kathakali Performance', 
    artist: 'Ravi M.', 
    views: '5.6k', 
    likes: 450, 
    thumbnail: 'https://img.youtube.com/vi/K2mp3T3YQFE/hqdefault.jpg',
    youtubeId: 'K2mp3T3YQFE',
    category: 'Performances', 
    time: '45:00' 
  },
  { 
    id: 4, 
    title: 'Traditional Warli Painting Tutorial', 
    artist: 'Priya Arts', 
    views: '1.8k', 
    likes: 95, 
    thumbnail: 'https://img.youtube.com/vi/1Q8fG0TtVAY/hqdefault.jpg',
    youtubeId: '1Q8fG0TtVAY',
    category: 'Tutorials', 
    time: '15:20' 
  },
  { 
    id: 5, 
    title: 'Rajasthani Folk Music Performance', 
    artist: 'Desert Musicians', 
    views: '3.2k', 
    likes: 210, 
    thumbnail: 'https://img.youtube.com/vi/O4JJ6zK9Rm8/hqdefault.jpg',
    youtubeId: 'O4JJ6zK9Rm8',
    category: 'Performances', 
    time: '18:30' 
  },
  { 
    id: 6, 
    title: 'Madhubani Painting Masterclass', 
    artist: 'Sita Devi', 
    views: '2.1k', 
    likes: 178, 
    thumbnail: 'https://img.youtube.com/vi/5TYTjBXsaYs/hqdefault.jpg',
    youtubeId: '5TYTjBXsaYs',
    category: 'Masterclasses', 
    time: '32:00' 
  },
];

export default function VideoGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const categories = ['All', 'Tutorials', 'Performances', 'Masterclasses', 'Cultural Vlogs'];

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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredVideos.map((video, i) => (
            <motion.div
              layout
              key={video.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group space-y-4 cursor-pointer"
              onClick={() => setPlayingVideo(video.youtubeId)}
            >
              <div className="aspect-video relative rounded-[32px] overflow-hidden bg-slate-100 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/20">
                    {video.category}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4">
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
                <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight uppercase line-clamp-2 tracking-tight">
                  {video.title}
                </h3>
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

      {/* YouTube Player Modal */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setPlayingVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video rounded-[32px] overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setPlayingVideo(null)}
                className="absolute top-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-black/80 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
