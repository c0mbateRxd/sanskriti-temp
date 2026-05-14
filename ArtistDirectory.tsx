import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Sparkles, MapPin, Star, Laptop, Users, GraduationCap, ChevronRight, Loader2 } from 'lucide-react';
import { ARTISTS_DATA, Artist } from '../data/artists';
import { useNavigate } from 'react-router-dom';
import { getMentors } from '../firebase/firestore';

export default function ArtistDirectory() {
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');
  const [mentors, setMentors] = useState<Artist[]>(ARTISTS_DATA);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMentors = async () => {
      try {
        const firestoreMentors = await getMentors();
        if (firestoreMentors.length > 0) {
          // Merge or state priority
          setMentors(firestoreMentors);
        }
      } catch (error) {
        console.error('Failed to load mentors from Firestore', error);
      } finally {
        setLoading(false);
      }
    };
    loadMentors();
  }, []);

  const states = useMemo(() => ['All', ...new Set(mentors.map(a => a.state))], [mentors]);
  const modes = ['All', 'Online', 'Offline', 'Hybrid'];

  const filteredArtists = useMemo(() => {
    return mentors.filter(a => {
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || 
                          a.specialization.toLowerCase().includes(search.toLowerCase());
      const matchState = selectedState === 'All' || a.state === selectedState;
      const matchMode = selectedMode === 'All' || a.teachingMode === selectedMode;
      return matchSearch && matchState && matchMode;
    });
  }, [search, selectedState, selectedMode, mentors]);

  return (
    <div className="min-h-screen pt-12 pb-20 px-6 space-y-16 max-w-[1600px] mx-auto">
      {/* Hero Header */}
      <section className="flex flex-col lg:flex-row justify-between items-end gap-12">
        <div className="space-y-6 max-w-3xl">
          <div className="flex items-center gap-3">
             <div className="h-1 w-12 bg-amber-500 rounded-full" />
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600">Bharat Mentor Network</p>
          </div>
          <h1 className="text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85] uppercase">
            Learn From <br /> <span className="text-zinc-300 dark:text-white/10 italic">The Masters</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-white/40 font-medium leading-relaxed">
            Connect with hereditary artisans, classical performers, and master craftsmen. Master the ancient arts through direct mentorship.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
           {[
             { label: 'Mentors', val: mentors.length, icon: GraduationCap },
             { label: 'States', val: states.length - 1, icon: MapPin },
             { label: 'Workshops', val: '50+', icon: Users },
             { label: 'Global Students', val: '2.5k', icon: Laptop }
           ].map((stat, i) => (
             <div key={i} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-[32px] text-center space-y-1">
               <stat.icon className="w-4 h-4 mx-auto mb-2 text-amber-500" />
               <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.val}</p>
               <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20">{stat.label}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-24 z-40 bg-slate-50/80 dark:bg-zinc-950/80 backdrop-blur-xl py-6 border-y border-slate-200 dark:border-white/5 mx-[-24px] px-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 group">
             <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-500" />
             <div className="relative flex items-center bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
               <Search className="ml-4 w-5 h-5 text-slate-400 dark:text-white/20" />
               <input 
                 type="text" 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 placeholder="Find a master by art, dance, or name..." 
                 className="w-full py-5 px-4 outline-none text-sm font-bold bg-transparent text-slate-900 dark:text-white"
               />
             </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
             <select 
               value={selectedState}
               onChange={(e) => setSelectedState(e.target.value)}
               className="px-6 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40 outline-none focus:border-amber-500"
             >
               {states.map(s => <option key={s} value={s}>{s === 'All' ? 'Select State' : s}</option>)}
             </select>

             <select 
               value={selectedMode}
               onChange={(e) => setSelectedMode(e.target.value)}
               className="px-6 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40 outline-none focus:border-amber-500"
             >
               {modes.map(m => <option key={m} value={m}>{m === 'All' ? 'Learning Mode' : m}</option>)}
             </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredArtists.map((artist, i) => (
            <motion.div
              layout
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/artist/${artist.id}`)}
              className="group relative bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px] overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={artist.avatar} 
                  alt={artist.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-8 left-8 flex flex-col gap-2">
                   <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-[8px] font-black uppercase tracking-widest w-fit">
                     {artist.specialization}
                   </span>
                   <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white rounded-full text-[8px] font-black uppercase tracking-widest w-fit border border-white/20">
                     {artist.experience} XP
                   </span>
                </div>

                <div className="absolute bottom-8 left-8 right-8 space-y-1">
                   <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-[10px] font-black">{artist.rating}</span>
                      <span className="text-[10px] text-white/40 font-bold">({artist.reviewsCount})</span>
                   </div>
                   <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{artist.name}</h3>
                   <div className="flex items-center gap-2 text-white/60">
                     <MapPin className="w-3 h-3" />
                     <p className="text-[10px] font-bold uppercase tracking-widest">{artist.state}</p>
                   </div>
                </div>
              </div>

              <div className="p-10 space-y-6">
                <p className="text-sm text-slate-500 dark:text-white/40 line-clamp-2 font-medium">
                  {artist.bio}
                </p>

                <div className="flex flex-wrap gap-2">
                  {artist.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full text-[9px] font-bold text-slate-500 dark:text-white/30 uppercase tracking-widest">
                      {skill}
                    </span>
                  ))}
                  {artist.skills.length > 3 && (
                    <span className="px-3 py-1 text-[9px] font-bold text-amber-500 uppercase tracking-widest">
                      +{artist.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                   <div className="space-y-1">
                     <p className="text-[8px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest">Session Logic</p>
                     <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight">₹{artist.price}<span className="text-xs font-bold text-slate-400">/hr</span></p>
                   </div>
                   <button className="p-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-xl">
                      <ChevronRight className="w-5 h-5" />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* No Results */}
      {filteredArtists.length === 0 && (
         <div className="py-40 text-center border-4 border-dashed border-slate-200 dark:border-white/5 rounded-[64px] bg-slate-50 dark:bg-white/2">
            <GraduationCap className="w-20 h-20 mx-auto text-slate-200 dark:text-white/5 mb-6 animate-pulse" />
            <p className="text-xl font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.4em]">No masters found in this region</p>
            <button 
              onClick={() => { setSearch(''); setSelectedState('All'); setSelectedMode('All'); }}
              className="mt-6 text-amber-600 font-bold hover:underline"
            >
              Reset Search
            </button>
         </div>
      )}
    </div>
  );
}
