import React from 'react';
import { motion } from 'motion/react';
import { StateCulture } from '../data/states';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { CheckCircle2, MapPin, Feather } from 'lucide-react';

export interface StateCardProps {
  state: StateCulture;
  onClick: (state: StateCulture) => void;
}

export const StateCard: React.FC<StateCardProps> = ({ state, onClick }) => {
  const { language } = useLanguage();
  const { isStateExplored } = useUser();
  const explored = isStateExplored(state.id);

  return (
    <motion.div
      layout
      whileHover={{ y: -8 }}
      className="group relative h-[420px] rounded-[32px] overflow-hidden cursor-pointer"
      onClick={() => onClick(state)}
    >
      {/* Background Image with animated zoom */}
      <motion.img
  src={state.image}
  alt={state.name[language]}
  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  onError={(e) => {
    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800';
  }}
/>

      {/* Overlays */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80`} />
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${state.gradient} mix-blend-overlay duration-500`} />

      {/* Content */}
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

      {/* Border glow */}
      <div className="absolute inset-0 border border-white/10 rounded-[32px] group-hover:border-white/30 transition-colors" />
    </motion.div>
  );
};

export default StateCard;
