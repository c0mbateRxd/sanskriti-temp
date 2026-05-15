import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Play, Compass, MapPin, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import TrendingSection from '../components/TrendingSection';
import ProgressTracker from '../components/ProgressTracker';

const BG_IMAGES = [
  'https://images.unsplash.com/photo-1599661046289-e31897856741?auto=format&fit=crop&q=80&w=1920', // Rajasthan dancers
  'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1920', // Temple
  'https://images.unsplash.com/photo-1541014285461-84067980ea0a?auto=format&fit=crop&q=80&w=1920', // Karnataka
  'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1920', // Kerala
  'https://images.unsplash.com/photo-1514222139-b576bb5ce003?auto=format&fit=crop&q=80&w=1920', // Culture
];

function AshokaChakra() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      className="absolute right-[-150px] top-[-150px] w-[600px] h-[600px] opacity-5 pointer-events-none"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="95" fill="none" stroke="#f97316" strokeWidth="4"/>
        <circle cx="100" cy="100" r="15" fill="none" stroke="#f97316" strokeWidth="4"/>
        <circle cx="100" cy="100" r="8" fill="#f97316"/>
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const rad = (angle * Math.PI) / 180;
          const x1 = 100 + 15 * Math.cos(rad);
          const y1 = 100 + 15 * Math.sin(rad);
          const x2 = 100 + 92 * Math.cos(rad);
          const y2 = 100 + 92 * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1} y1={y1}
              x2={x2} y2={y2}
              stroke="#f97316"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    </motion.div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % BG_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pb-20 space-y-32">
      {/* Hero Section */}
      <section className="relative pt-20 pb-0 px-6 min-h-screen flex items-center overflow-hidden">
        
        {/* Dynamic Background */}
        <AnimatePresence mode="sync">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={BG_IMAGES[currentBg]}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/80 dark:bg-zinc-950/85" />
          </motion.div>
        </AnimatePresence>

        {/* Ashoka Chakra */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AshokaChakra />
          {/* Second smaller one bottom left */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute left-[-100px] bottom-[-100px] w-[400px] h-[400px] opacity-5 pointer-events-none"
          >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="95" fill="none" stroke="#f97316" strokeWidth="4"/>
              <circle cx="100" cy="100" r="15" fill="none" stroke="#f97316" strokeWidth="4"/>
              <circle cx="100" cy="100" r="8" fill="#f97316"/>
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * 360) / 24;
                const rad = (angle * Math.PI) / 180;
                const x1 = 100 + 15 * Math.cos(rad);
                const y1 = 100 + 15 * Math.sin(rad);
                const x2 = 100 + 92 * Math.cos(rad);
                const y2 = 100 + 92 * Math.sin(rad);
                return (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f97316" strokeWidth="2"/>
                );
              })}
            </svg>
          </motion.div>
        </div>

        {/* Image dots indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {BG_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBg(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentBg ? 'bg-orange-500 w-6' : 'bg-slate-400 dark:bg-white/30'
              }`}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500"
          >
            <Sparkles className="w-4 h-4 fill-orange-500" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">{t('hero_title')}</span>
          </motion.div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] text-slate-900 dark:text-white"
            >
              BHARAT <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-500 italic">ARCHIVE</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-2xl text-slate-500 dark:text-white/40 max-w-2xl mx-auto font-medium"
            >
              {t('hero_subtitle')}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              to="/discover"
              className="group relative px-10 py-5 bg-orange-500 rounded-2xl text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              Explore Legacy
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="group px-10 py-5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3">
              Watch Reel
              <Play className="w-4 h-4 fill-current" />
            </button>
          </motion.div>

          <div className="relative pt-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full -z-10" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { icon: Compass, label: 'Cultural Deep-Dive', color: 'orange' },
                { icon: Sparkles, label: 'AI Narratives', color: 'rose' },
                { icon: MapPin, label: 'State Discovery', color: 'indigo' },
                { icon: TrendingUp, label: 'Heritage Trends', color: 'emerald' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="p-8 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl text-center space-y-4 shadow-xl"
                >
                  <item.icon className={`w-8 h-8 mx-auto text-${item.color}-500`} />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="max-w-7xl mx-auto px-6">
        <ProgressTracker />
      </section>

      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-6">
        <TrendingSection />
      </section>
    </div>
  );
}
