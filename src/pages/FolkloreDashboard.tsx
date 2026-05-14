import React from 'react';
import { motion } from 'motion/react';
import { 
  Book, Sparkles, Search, Filter, 
  Play, Headset, Share2, Heart, 
  MapPin, Plus, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Village Legends', 'Tribal Myths', 'Historical Tales', 
  'Ghost Stories', 'Heroic Legends', 'Ancient Wisdom'
];

const folkloreStories = [
  {
    id: 'f1',
    title: 'The Whispering Banyan of Mysore',
    state: 'Karnataka',
    category: 'Village Legend',
    description: 'A mystical banyan tree near an abandoned temple was believed to protect villagers during times of famine.',
    moral: 'Nature protects those who respect it.',
    illustration: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800',
    likes: 1240,
    tags: ['Nature', 'Mystic', 'Spirituality']
  },
  {
    id: 'f2',
    title: 'The Shadow of Kumbhalgarh',
    state: 'Rajasthan',
    category: 'Historical Tales',
    description: 'The story of a loyal sacrifice that allowed the massive walls of Kumbhalgarh to finally stand firm against the desert winds.',
    moral: 'Loyalty is the foundation of greatness.',
    illustration: 'https://images.unsplash.com/photo-1599661046289-e31897856741?auto=format&fit=crop&q=80&w=800',
    likes: 890,
    tags: ['Fort', 'History', 'Sacrifice']
  },
  {
    id: 'f3',
    title: 'The Rain Queen of Cherrapunji',
    state: 'Meghalaya',
    category: 'Nature Myths',
    description: 'A tale of a weaver who could summon clouds by weaving patterns of blue and silver on her loom.',
    moral: 'Art has the power to change the world.',
    illustration: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=800',
    likes: 2100,
    tags: ['Rain', 'Weaving', 'Magic']
  }
];

export default function FolkloreDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-12 pb-20 px-6 max-w-7xl mx-auto space-y-16">
      {/* Hero Header */}
      <header className="space-y-6 text-center">
        <div className="flex justify-center items-center gap-3">
           <div className="h-px w-12 bg-amber-500" />
           <p className="text-[10px] font-black uppercase tracking-[0.6em] text-amber-600">The Folklore Universe</p>
           <div className="h-px w-12 bg-amber-500" />
        </div>
        <h1 className="text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.8] uppercase italic">
          Echoes of <br /> <span className="text-amber-500">Ancient Paths</span>
        </h1>
        <p className="text-slate-500 dark:text-white/40 max-w-2xl mx-auto font-medium text-lg">
          Dive into thousands of years of storytelling. From tribal myths to village legends, explore the soul of India.
        </p>
      </header>

      {/* Discovery Hub */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar: Categories & Featured Creator */}
        <div className="lg:col-span-3 space-y-8">
           <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Oral Traditions</h4>
              <div className="space-y-1">
                 {categories.map(cat => (
                   <button key={cat} className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-xs font-black uppercase tracking-widest text-slate-600 dark:text-white/60">
                      {cat}
                   </button>
                 ))}
              </div>
           </div>

           <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[32px] p-8 text-white space-y-6">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                 <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-black leading-none uppercase italic">AI Story <br /> Weaver</h4>
              <p className="text-xs text-white/60 font-medium">Have a fragment of a legend? Our AI can help you expand it into a full saga.</p>
              <button 
                onClick={() => navigate('/folklore/create')}
                className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all"
              >
                 Create Now
              </button>
           </div>
        </div>

        {/* Stories Feed */}
        <div className="lg:col-span-9 space-y-8">
           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 group w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search legends, characters, or states..." 
                  className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>
              <button className="p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-400">
                 <Filter className="w-5 h-5" />
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {folkloreStories.map((story, i) => (
                <motion.div
                  key={story.id}
                  onClick={() => navigate(`/folklore/view/${story.id}`)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative h-[500px] rounded-[48px] overflow-hidden bg-slate-900 cursor-pointer shadow-2xl"
                >
                   <img src={story.illustration} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                   
                   <div className="absolute top-8 left-8 flex gap-2">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/20">
                         {story.category}
                      </span>
                      <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/20">
                         {story.state}
                      </span>
                   </div>

                   <div className="absolute bottom-8 left-8 right-8 space-y-4">
                      <h3 className="text-3xl font-black text-white leading-none uppercase tracking-tighter italic">
                         {story.title}
                      </h3>
                      <p className="text-sm text-white/60 line-clamp-2 font-medium">
                         {story.description}
                      </p>
                      <div className="flex items-center justify-between pt-4">
                         <div className="flex gap-4">
                            <button className="flex items-center gap-2 text-white/40 hover:text-rose-500 transition-colors">
                               <Heart className="w-4 h-4" />
                               <span className="text-[10px] font-black uppercase">{story.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 text-white/40 hover:text-indigo-400 transition-colors">
                               <Share2 className="w-4 h-4" />
                            </button>
                         </div>
                         <button className="p-3 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform">
                            <Play className="w-4 h-4 fill-current" />
                         </button>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Map Explorer Mock */}
      <section className="bg-slate-900 rounded-[64px] p-12 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            {/* SVG Illustration of India map would go here */}
         </div>
         <div className="relative z-10 space-y-8 max-w-xl">
            <h3 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">Map of <br /> <span className="text-indigo-400">Living Tales</span></h3>
            <p className="text-lg text-white/40 font-medium">Click on any state to unlock the forgotten legends of that soil. Hundreds of local myths at your fingertips.</p>
            <div className="flex gap-4">
               <button className="px-10 py-5 bg-white text-slate-900 rounded-3xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all">Explore Map</button>
               <button className="px-10 py-5 border border-white/10 text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all">Listen Randomly</button>
            </div>
         </div>
      </section>

      {/* Featured Mentors/Artists specifically for folklore */}
      <section className="space-y-12">
         <div className="flex items-end justify-between">
            <div className="space-y-4">
               <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Master <span className="text-amber-500">Narrators</span></h3>
               <p className="text-slate-400 dark:text-white/20 font-black uppercase tracking-widest text-[10px]">Learn the art of storytelling from the guardians themselves</p>
            </div>
            <button className="p-4 bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"><ArrowRight className="w-6 h-6" /></button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="group p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px] space-y-6 hover:border-amber-500/50 transition-colors">
                 <div className="w-20 h-20 rounded-[28px] overflow-hidden bg-slate-100 dark:bg-white/10">
                    <img src={`https://i.pravatar.cc/150?u=${i+20}`} alt="" />
                 </div>
                 <div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">Ravi Shenoy</h4>
                    <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest">Village Legend Specialist &bull; Karnataka</p>
                 </div>
                 <p className="text-xs font-medium text-slate-500 dark:text-white/40 leading-relaxed">"Bringing 300-year-old oral traditions to the digital age. I help you master the nuances of rhythm and tone."</p>
                 <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all">Book Private Session</button>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
