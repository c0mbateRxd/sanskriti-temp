import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Video, Mic, MicOff, VideoOff, PhoneOff, 
  MessageSquare, Users, ScreenShare, Settings,
  Hand, Smile, MoreVertical, Radio, Play,
  Share2, Heart, MessageCircle, Gift, Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LiveStreamingRoom() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [viewerCount, setViewerCount] = useState(142);
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-stone-950 z-[200] flex flex-col font-sans">
       {/* Top Status Bar */}
       <div className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-zinc-900/50 backdrop-blur-md">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3 px-4 py-2 bg-rose-600 rounded-xl animate-pulse shadow-lg shadow-rose-600/20">
                <Radio className="w-4 h-4 text-white" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live: 12:45</span>
             </div>
             <div className="h-6 w-px bg-white/10" />
             <div className="space-y-0.5">
                <h2 className="text-sm font-black text-white uppercase tracking-widest leading-none">Traditional Puppetry Showcase</h2>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Broadcasting to Folklore Universe &bull; Region: Rajasthan</p>
             </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <Users className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] font-black text-white uppercase">{viewerCount} Watching</span>
             </div>
             <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white text-[10px] font-black uppercase tracking-widest border border-indigo-500/20 shadow-xl transition-all">End Broadcast</button>
          </div>
       </div>

       {/* Studio Layout */}
       <div className="flex-1 p-6 flex gap-6 overflow-hidden">
          {/* Main Monitor Area */}
          <div className="flex-1 flex flex-col gap-6">
             <div className="flex-1 rounded-[48px] bg-white/5 border border-white/10 relative overflow-hidden group">
                {/* Mock Camera Feed */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover opacity-80" 
                  alt="Mentor"
                />
                
                {/* On-Air Overlays */}
                <div className="absolute top-10 left-10 space-y-4">
                   <div className="p-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10">
                      <p className="text-[10px] font-black text-white uppercase tracking-widest opacity-40 mb-1">Current Scene</p>
                      <p className="text-xs font-black text-white uppercase tracking-widest">Main Camera + Overlay</p>
                   </div>
                </div>

                {/* Viewport UI Controls */}
                <div className="absolute bottom-10 left-10 flex gap-4">
                   <button className="p-4 bg-white text-slate-900 rounded-2xl shadow-xl hover:scale-105 transition-all">
                      <ScreenShare className="w-5 h-5" />
                   </button>
                   <button className="p-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 text-white hover:bg-white/20 transition-all">
                      <Layers className="w-5 h-5" />
                   </button>
                </div>
             </div>

             {/* Control Surface */}
             <div className="h-32 bg-white/5 border border-white/10 rounded-[40px] flex items-center justify-between px-10">
                <div className="flex items-center gap-6">
                   <button 
                     onClick={() => setIsMuted(!isMuted)}
                     className={`p-6 rounded-3xl transition-all ${isMuted ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                   >
                      {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                   </button>
                   <button 
                      onClick={() => setIsVideoOff(!isVideoOff)}
                      className={`p-6 rounded-3xl transition-all ${isVideoOff ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                   >
                      {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                   </button>
                </div>

                <div className="flex items-center gap-4">
                   <div className="h-12 w-px bg-white/10 mx-4" />
                   <button className="p-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all">
                      <Share2 className="w-6 h-6" />
                   </button>
                   <button className="p-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all">
                      <Settings className="w-6 h-6" />
                   </button>
                </div>
             </div>
          </div>

          {/* Engagement Sidebar */}
          <div className="w-[400px] flex flex-col gap-6">
             {/* Chat Room */}
             <div className="flex-1 bg-white/2 rounded-[40px] border border-white/5 flex flex-col p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                   <div className="flex items-center gap-3">
                      <MessageSquare className="w-4 h-4 text-indigo-400" />
                      <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Live Audience</h3>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span className="text-[8px] font-black text-white/40 uppercase">Real-time</span>
                   </div>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                   {[
                     { user: 'Arjun_99', msg: 'The way the puppets move is so fluid!', type: 'chat' },
                     { user: 'Meera_Arts', msg: 'Welcome everyone to the Folklore Hour.', type: 'host' },
                     { user: 'CultureBot', msg: 'Arjun_99 just sent a Virtual Diya! 🕯️', type: 'system' },
                     { user: 'Kriti_V', msg: 'Can you show the finger controls again?', type: 'chat' }
                   ].map((m, i) => (
                     <div key={i} className={`p-4 rounded-2xl ${m.type === 'host' ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-white/2'}`}>
                        <p className={`text-[9px] font-black uppercase mb-1 ${m.type === 'host' ? 'text-indigo-400' : m.type === 'system' ? 'text-amber-400' : 'text-white/40'}`}>
                           {m.user}
                        </p>
                        <p className="text-xs text-white/70 font-medium leading-relaxed">{m.msg}</p>
                     </div>
                   ))}
                </div>

                <div className="relative group">
                   <input 
                     type="text" 
                     placeholder="Say something to the master..." 
                     className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm text-white outline-none focus:border-indigo-500 transition-all"
                   />
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                      <button className="p-2 text-white/20 hover:text-rose-500 transition-colors"><Heart className="w-4 h-4" /></button>
                      <button className="p-2 text-white/20 hover:text-amber-500 transition-colors"><Gift className="w-4 h-4" /></button>
                   </div>
                </div>
             </div>

             {/* Live Analytics Mini */}
             <div className="bg-gradient-to-br from-slate-900 to-zinc-950 border border-white/10 rounded-[32px] p-8 space-y-4">
                <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Real-time Engagement</h4>
                <div className="flex gap-4 items-end h-16">
                   {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                     <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        className="flex-1 bg-indigo-500 rounded-t-md opacity-40 hover:opacity-100 transition-opacity"
                     />
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
