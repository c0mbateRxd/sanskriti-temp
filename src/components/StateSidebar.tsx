import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Book, Music, Utensils, Calendar, Sparkles, ArrowRight, Share2, Plus, Info } from 'lucide-react';
import { STATE_CULTURAL_DATA, StateCode } from '../data/stateData';

interface StateSidebarProps {
  stateCode: StateCode | null;
  onClose: () => void;
}

const StateSidebar: React.FC<StateSidebarProps> = ({ stateCode, onClose }) => {
  const data = stateCode ? STATE_CULTURAL_DATA[stateCode] : null;

  return (
    <AnimatePresence>
      {data && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#050505]/90 border-l border-white/10 shadow-2xl z-[70] overflow-y-auto card-pattern flex flex-col"
          >
            {/* Header Sticky */}
            <div className="sticky top-0 z-20 flex items-center justify-between p-8 bg-[#050505]/50 backdrop-blur-xl border-b border-white/5">
              <div className="space-y-1">
                <span className="text-saffron text-[10px] font-black uppercase tracking-[0.4em] block">Regional Explorer</span>
                <h2 className="text-5xl serif font-bold tracking-tight text-white">{data.name}</h2>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all group"
              >
                <X className="w-6 h-6 text-white/50 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
              </button>
            </div>

            <div className="p-8 space-y-10 flex-1">
              {/* Hero Banner */}
              <div className="relative rounded-[2rem] overflow-hidden aspect-video group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <img 
                  src={data.banner} 
                  alt={data.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-saffron fill-saffron" />
                    <span className="text-[10px] font-bold text-white/60 tracking-[0.3em] uppercase">Signature Landmark</span>
                  </div>
                  <p className="text-sm font-medium text-white/90 max-w-xs">{data.desc}</p>
                </div>
              </div>

              {/* Cultural Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl glass border-white/5 flex flex-col justify-between aspect-square hover:border-saffron/30 transition-colors">
                  <Music className="w-8 h-8 text-saffron" />
                  <div>
                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Tradition</h4>
                    <p className="text-lg font-bold serif">{data.tradition}</p>
                  </div>
                </div>
                <div className="p-6 rounded-3xl glass border-white/5 flex flex-col justify-between aspect-square hover:border-india-green/30 transition-colors">
                  <Sparkles className="w-8 h-8 text-india-green" />
                  <div>
                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Art Form</h4>
                    <p className="text-lg font-bold serif">{data.art}</p>
                  </div>
                </div>
                <div className="p-6 rounded-3xl glass border-white/5 flex flex-col justify-between aspect-square hover:border-white/20 transition-colors">
                  <Utensils className="w-8 h-8 text-white" />
                  <div>
                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Cuisine</h4>
                    <p className="text-lg font-bold serif">{data.food}</p>
                  </div>
                </div>
                <div className="p-6 rounded-3xl glass border-white/5 flex flex-col justify-between aspect-square hover:border-navy/50 transition-colors">
                  <Calendar className="w-8 h-8 text-navy-blue" />
                  <div>
                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Major Fest</h4>
                    <p className="text-lg font-bold serif">{data.festival}</p>
                  </div>
                </div>
              </div>

              {/* Folklore Preview */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] px-2 flex items-center gap-2">
                  <Book className="w-3 h-3" />
                  Featured Narrative
                </h3>
                <div className="p-8 rounded-[2rem] glass border-white/5 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/5 blur-3xl pointer-events-none" />
                  <p className="text-2xl serif italic mb-4 text-white/90">"{data.folklore}"</p>
                  <p className="text-sm text-white/50 leading-relaxed max-w-sm mb-6">
                    A timeless saga passed down through generations, whispering the ancient secrets of {data.name}'s divine heritage...
                  </p>
                  <button className="flex items-center gap-2 text-saffron text-xs font-bold uppercase tracking-widest hover:gap-4 transition-all group">
                    Read Full Story <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* AI Discoveries */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] px-2 flex items-center gap-2">
                  <Info className="w-3 h-3" />
                  AI Cultural Analysis
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.recommendations.map((rec) => (
                    <div key={rec} className="px-5 py-3 rounded-full glass border-white/10 text-[10px] font-black uppercase tracking-widest hover:border-saffron hover:bg-saffron/10 transition-colors cursor-pointer">
                      {rec}
                    </div>
                  ))}
                  <div className="px-5 py-3 rounded-full glass border-white/10 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 italic text-white/40">
                    <Plus className="w-3 h-3" /> Discover More
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Actions */}
            <div className="sticky bottom-0 p-8 glass backdrop-blur-2xl border-t border-white/10 flex gap-4 bg-[#050505]/80">
              <button className="flex-1 py-4 bg-white text-navy font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-saffron hover:text-black transition-all transform hover:scale-[1.02]">
                Explore Rituals
              </button>
              <button className="p-4 glass rounded-2xl hover:bg-white/10 transition-colors">
                <Share2 className="w-5 h-5 text-white/60" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StateSidebar;
