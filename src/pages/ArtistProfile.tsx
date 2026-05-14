import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Star, Calendar, MessageSquare, Heart, Share2, 
  ChevronLeft, Play, Layout, Users, ShieldCheck, Clock, 
  Video, BookOpen, MessageCircle, Phone, Mail, Loader2
} from 'lucide-react';
import { ARTISTS_DATA, Artist } from '../data/artists';
import { useUser } from '../context/UserContext';
import { getMentors, getMentor } from '../firebase/firestore';

export default function ArtistProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, login } = useUser();
  const [artist, setArtist] = useState<Artist | undefined>(ARTISTS_DATA.find(a => a.id === id));
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'About' | 'Portfolio' | 'Reviews' | 'Tutorials'>('About');
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const loadArtist = async () => {
      try {
        if (id) {
          const found = await getMentor(id);
          if (found) {
            setArtist(found);
          }
        }
      } catch (error) {
        console.error('Error fetching artist from Firestore', error);
      } finally {
        setLoading(false);
      }
    };
    loadArtist();
  }, [id]);

  if (loading && !artist) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
        <p className="text-xl font-black text-slate-400 uppercase tracking-widest">Entering the Master's Studio...</p>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-black text-slate-400">Mentor not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Dynamic Header */}
      <section className="relative h-[600px]">
         <img src={artist.avatar} alt="" className="absolute inset-0 w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
         
         <div className="absolute top-12 left-6 lg:left-12">
            <button 
              onClick={() => navigate(-1)}
              className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl text-white hover:bg-white/20 transition-all border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
         </div>

         <div className="absolute bottom-12 left-6 lg:left-12 right-6 lg:right-12 flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-6 max-w-2xl">
               <div className="flex flex-wrap gap-2">
                 <span className="px-4 py-1.5 bg-amber-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                   {artist.specialization}
                 </span>
                 <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                   {artist.teachingMode} Master
                 </span>
               </div>
               
               <h1 className="text-7xl font-black text-white tracking-tighter uppercase leading-[0.85]">
                 {artist.name}
               </h1>

               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-white">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-black">{artist.rating}</span>
                    <span className="text-sm font-bold text-white/40">({artist.reviewsCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-black uppercase tracking-widest">{artist.state}</span>
                  </div>
               </div>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
               <button 
                 onClick={() => user ? setShowBooking(true) : login()}
                 className="flex-1 md:flex-none px-10 py-5 bg-white text-slate-900 rounded-3xl font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all"
               >
                 Book Live Session
               </button>
               <button className="p-5 bg-white/10 backdrop-blur-md text-white rounded-3xl border border-white/20 hover:bg-white/20 transition-all">
                 <MessageSquare className="w-6 h-6" />
               </button>
            </div>
         </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Details */}
        <div className="lg:col-span-8 space-y-12">
           {/* Tabs */}
           <div className="flex gap-8 border-b border-slate-200 dark:border-white/5 overflow-x-auto pb-4 scrollbar-hide">
              {['About', 'Portfolio', 'Tutorials', 'Reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`text-sm font-black uppercase tracking-widest transition-all relative ${
                    activeTab === tab ? 'text-amber-600' : 'text-slate-400 dark:text-white/20'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="tab-line" className="absolute -bottom-4 left-0 right-0 h-1 bg-amber-500 rounded-full" />
                  )}
                </button>
              ))}
           </div>

           <AnimatePresence mode="wait">
             {activeTab === 'About' && (
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="space-y-10"
               >
                 <div className="space-y-6">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Biography</h3>
                    <p className="text-xl text-slate-500 dark:text-white/60 leading-relaxed font-medium">
                      {artist.bio}
                    </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-slate-50 dark:bg-white/2 rounded-[40px] border border-slate-100 dark:border-white/5 space-y-6">
                       <h4 className="text-xs font-black uppercase tracking-widest text-amber-600">Core Expertise</h4>
                       <div className="flex flex-wrap gap-2">
                          {artist.skills.map(skill => (
                            <span key={skill} className="px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                              {skill}
                            </span>
                          ))}
                       </div>
                    </div>

                    <div className="p-8 bg-slate-50 dark:bg-white/2 rounded-[40px] border border-slate-100 dark:border-white/5 space-y-4">
                       <h4 className="text-xs font-black uppercase tracking-widest text-amber-600">Teaching Snapshot</h4>
                       <div className="space-y-4">
                          <div className="flex items-center gap-3">
                             <Clock className="w-4 h-4 text-slate-400" />
                             <p className="text-xs font-bold text-slate-600 dark:text-white/40 uppercase tracking-widest">Available: Weekends 10 AM - 4 PM</p>
                          </div>
                          <div className="flex items-center gap-3">
                             <Users className="w-4 h-4 text-slate-400" />
                             <p className="text-xs font-bold text-slate-600 dark:text-white/40 uppercase tracking-widest">Group Size: Max 10 students</p>
                          </div>
                          <div className="flex items-center gap-3">
                             <ShieldCheck className="w-4 h-4 text-slate-400" />
                             <p className="text-xs font-bold text-slate-600 dark:text-white/40 uppercase tracking-widest">Certified Master Artist</p>
                          </div>
                       </div>
                    </div>
                 </div>
               </motion.div>
             )}

             {activeTab === 'Tutorials' && (
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="grid grid-cols-1 md:grid-cols-2 gap-8"
               >
                 {artist.demoVideos.length > 0 ? artist.demoVideos.map((video) => (
                   <div key={video.id} className="group relative rounded-[32px] overflow-hidden bg-slate-100 dark:bg-white/5 aspect-video border border-slate-200 dark:border-white/10">
                      <img src={video.thumbnail} alt="" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="p-4 bg-white text-slate-900 rounded-full shadow-2xl scale-0 group-hover:scale-100 transition-transform">
                            <Play className="w-6 h-6 fill-current" />
                         </div>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6">
                         <h4 className="text-lg font-black text-white tracking-tighter uppercase">{video.title}</h4>
                         <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Master Tutorial &bull; Free Preview</p>
                      </div>
                   </div>
                 )) : (
                   <div className="col-span-full py-20 text-center border-4 border-dashed border-slate-100 dark:border-white/5 rounded-[48px]">
                      <Video className="w-12 h-12 mx-auto text-slate-200 mb-4" />
                      <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Exclusive tutorials coming soon</p>
                   </div>
                 )}
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Right Side: Card & Quick Actions */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px] p-10 space-y-10 sticky top-32">
              <div className="text-center space-y-2">
                 <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.3em]">Direct Mentorship</p>
                 <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">₹{artist.price}<span className="text-sm text-slate-400">/HR</span></h2>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No hidden fees &bull; Includes materials list</p>
              </div>

              <div className="space-y-4">
                 <button 
                   onClick={() => user ? setShowBooking(true) : login()}
                   className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[32px] font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                 >
                   <Calendar className="w-4 h-4" />
                   Book Live Class
                 </button>
                 <button className="w-full py-6 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/40 rounded-[32px] font-black uppercase tracking-widest text-xs hover:bg-slate-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-3">
                   <MessageCircle className="w-4 h-4" />
                   Message Master
                 </button>
              </div>

              <div className="pt-10 border-t border-slate-100 dark:border-white/5 space-y-6">
                 <h4 className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest">Connect with Artist</h4>
                 <div className="flex flex-col gap-3">
                    <a 
                      href={`mailto:${artist.email}`}
                      className="flex items-center gap-4 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all group"
                    >
                       <Mail className="w-5 h-5" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Email Artisan</span>
                    </a>
                    <a 
                      href={`tel:${artist.phone}`}
                      className="flex items-center gap-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all group"
                    >
                       <Phone className="w-5 h-5" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Call Artisan</span>
                    </a>
                 </div>
                 <div className="flex gap-4">
                    {artist.social.instagram && (
                      <a href="#" className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl text-slate-400 hover:text-amber-500 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </a>
                    )}
                 </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-amber-500/5 rounded-3xl border border-amber-500/10">
                 <div className="p-3 bg-amber-500 rounded-2xl text-white">
                   <Layout className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Bulk Discount</p>
                   <p className="text-xs font-bold text-slate-600 dark:text-white/60">Book 5 sessions, get 1 free</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
      
      {/* Booking Modal (Mock) */}
      <AnimatePresence>
        {showBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setShowBooking(false)}
               className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
             />
             <motion.div 
               initial={{ y: 50, opacity: 0, scale: 0.9 }}
               animate={{ y: 0, opacity: 1, scale: 1 }}
               exit={{ y: 50, opacity: 0, scale: 0.9 }}
               className="relative w-full max-w-lg bg-white dark:bg-zinc-950 rounded-[48px] p-12 overflow-hidden shadow-2xl space-y-10"
             >
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.4em]">Secure Booking</p>
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Select <br /> Your Slot</h3>
                </div>

                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      {['Mon 14', 'Tue 15', 'Wed 16', 'Thu 17'].map(d => (
                        <button key={d} className="p-6 rounded-3xl border border-slate-100 dark:border-white/5 text-center hover:border-amber-500 transition-all font-black text-sm uppercase tracking-widest">
                          {d}
                        </button>
                      ))}
                   </div>
                   <div className="grid grid-cols-3 gap-2">
                      {['10:00', '14:00', '18:00'].map(t => (
                        <button key={t} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-amber-500 transition-all text-[10px] font-black uppercase">
                          {t}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="flex gap-4 pt-6">
                   <button className="flex-1 py-5 bg-amber-500 text-white rounded-3xl font-black uppercase tracking-widest text-xs shadow-xl shadow-amber-500/20">
                     Confirm Session
                   </button>
                   <button onClick={() => setShowBooking(false)} className="px-8 py-5 border border-slate-100 dark:border-white/5 text-slate-400 rounded-3xl font-black uppercase tracking-widest text-xs">
                     Close
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
