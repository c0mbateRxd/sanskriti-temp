import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { StateCulture } from '../data/states';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { CheckCircle2, MapPin } from 'lucide-react';

const STATE_IMAGES: Record<string, string[]> = {
  karnataka: [
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1624461050280-e4e2c37e7415?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1541014285461-84067980ea0a?auto=format&fit=crop&q=80&w=800',
  ],
  tamil_nadu: [
    'https://images.unsplash.com/photo-1616593871468-2a9c3c739871?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600100397608-4dac73e786a0?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
  ],
  rajasthan: [
    'https://images.unsplash.com/photo-1599661046289-e31897856741?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1477587458883-47145ed68421?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
  ],
  kerala: [
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1609340033360-bba2cad1a50e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800',
  ],
  maharashtra: [
    'https://images.unsplash.com/photo-1562121307-88d01f807205?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800',
  ],
  gujarat: [
    'https://images.unsplash.com/photo-1594950195709-a14f66c241d7?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1477587458883-47145ed68421?auto=format&fit=crop&q=80&w=800',
  ],
  punjab: [
    'https://images.unsplash.com/photo-1514222139-b576bb5ce003?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1477587458883-47145ed68421?auto=format&fit=crop&q=80&w=800',
  ],
  west_bengal: [
    'https://images.unsplash.com/photo-1558431382-bb7b38c49051?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800',
  ],
  uttar_pradesh: [
    'https://images.unsplash.com/photo-1564507592316-56d8f5d6bb83?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1477587458883-47145ed68421?auto=format&fit=crop&q=80&w=800',
  ],
  assam: [
    'https://images.unsplash.com/photo-1571217030800-48301bc613d5?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800',
  ],
};

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1477587458883-47145ed68421?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800',
];

export interface StateCardProps {
  state: StateCulture;
  onClick: (state: StateCulture) => void;
}

export const StateCard: React.FC<StateCardProps> = ({ state, onClick }) => {
  const { language } = useLanguage();
  const { isStateExplored } = useUser();
  const explored = isStateExplored(state.id);
  const [imgIndex, setImgIndex] = useState(0);

  const images = STATE_IMAGES[state.id] || FALLBACK_IMAGES;

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div
      layout
      whileHover={{ y: -8 }}
      className="group relative h-[420px] rounded-[32px] overflow-hidden cursor-pointer"
      onClick={() => onClick(state)}
    >
      {images.map((img, i) => (
        <motion.img
          key={img}
          src={img}
          alt={state.name[language]}
          animate={{ opacity: i === imgIndex ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGES[0];
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${state.gradient} mix-blend-overlay duration-500`} />

      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white border border-white/10">
              {state.category}
            </span>
            {explored && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-green-500/20 backdrop-blur-md p-1.5 rounded-full border border-green-500/30"
              >
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </motion.div>
            )}
          </div>

          <div>
            <h3 className="text-3xl font-black tracking-tighter text-white group-hover:text-orange-400 transition-colors">
              {state.name[language]}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-white/60">
              <MapPin className="w-3 h-3" />
              <span className="text-[10px] uppercase font-bold tracking-widest leading-none">Explore Heritage</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <div className="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/5">
              <p className="text-[8px] text-white/40 uppercase font-bold tracking-widest mb-1">Dance</p>
              <p className="text-[10px] text-white font-bold">{state.dance}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/5">
              <p className="text-[8px] text-white/40 uppercase font-bold tracking-widest mb-1">Textile</p>
              <p className="text-[10px] text-white font-bold">{state.textile}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 border border-white/10 rounded-[32px] group-hover:border-white/30 transition-colors" />

      {/* Image dots */}
      <div className="absolute top-4 right-4 flex gap-1">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === imgIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default StateCard;
