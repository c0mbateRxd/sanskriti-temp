import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Video, Mic, MicOff, VideoOff, PhoneOff, 
  MessageSquare, Users, ScreenShare, Settings,
  Hand, Smile, MoreVertical
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LiveSessionUI() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-zinc-950 z-[200] flex flex-col">
       {/* Top Bar */}
       <div className="h-20 px-8 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-rose-500 rounded-xl animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full" />
             </div>
             <div className="space-y-0.5">
                <h2 className="text-sm font-black text-white uppercase tracking-widest">Tanjore Painting Workshop</h2>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Live with Meera Krishnan &bull; 12 Participants</p>
             </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-white/10 flex items-center justify-center overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?u=${i}`} alt="" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-white/5 flex items-center justify-center text-[8px] font-black text-white">+8</div>
             </div>
             <button className="px-6 py-2.5 bg-white/10 rounded-xl text-white text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/20">Record</button>
          </div>
       </div>

       {/* Main Grid */}
       <div className="flex-1 p-6 flex gap-6 overflow-hidden">
          {/* Main Speaker Stage */}
          <div className="flex-1 rounded-[48px] bg-white/5 border border-white/10 relative overflow-hidden group">
             <img 
               src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200" 
               className="w-full h-full object-cover opacity-80" 
               alt="Mentor"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
             
             <div className="absolute bottom-10 left-10 flex items-center gap-4">
                <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                   <p className="text-xs font-black text-white uppercase tracking-widest">Meera Krishnan (Host)</p>
                </div>
                <div className="flex gap-2">
                   <div className="p-3 bg-indigo-500 rounded-xl text-white shadow-xl">
                      <Mic className="w-4 h-4" />
                   </div>
                </div>
             </div>

             {/* UI Overlay: Interactive whiteboard mock */}
             <div className="absolute top-10 right-10 flex flex-col gap-4">
                <button className="p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-white hover:bg-white/20 transition-all">
                   <ScreenShare className="w-5 h-5" />
                </button>
                <button className="p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-white hover:bg-white/20 transition-all">
                   <Hand className="w-5 h-5" />
                </button>
                <button className="p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-white hover:bg-white/20 transition-all">
                   <Smile className="w-5 h-5" />
                </button>
             </div>
          </div>

          {/* Side Participants & Chat */}
          <div className="w-[400px] flex flex-col gap-6">
             {/* Participant Thumbnails */}
             <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-video rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden">
                     <img src={`https://i.pravatar.cc/300?u=${i+10}`} alt="" className="w-full h-full object-cover opacity-40" />
                     <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/40 rounded-lg text-[8px] font-black text-white uppercase tracking-widest">Student {i}</div>
                  </div>
                ))}
             </div>

             {/* Chat Room */}
             <div className="flex-1 bg-white/2 rounded-[40px] border border-white/5 flex flex-col p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                   <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Live Chat</h3>
                   <Settings className="w-4 h-4 text-white/20" />
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                   {[
                     { user: 'Student A', msg: 'The gold zari is beautiful!' },
                     { user: 'Mentor', msg: 'Yes, we will cover application now.' },
                     { user: 'Student B', msg: 'Wait, I missed the previous step.' }
                   ].map((m, i) => (
                     <div key={i} className="space-y-1">
                        <p className="text-[9px] font-black text-indigo-400 uppercase">{m.user}</p>
                        <p className="text-xs text-white/70 font-medium leading-relaxed">{m.msg}</p>
                     </div>
                   ))}
                </div>

                <div className="relative">
                   <input 
                     type="text" 
                     placeholder="Type a message..." 
                     className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-xs text-white outline-none focus:border-indigo-500 transition-all"
                   />
                </div>
             </div>
          </div>
       </div>

       {/* Control Bar */}
       <div className="h-28 px-12 flex items-center justify-center gap-8 relative">
          <div className="flex items-center gap-6">
             <button 
               onClick={() => setIsMuted(!isMuted)}
               className={`p-6 rounded-full transition-all ${isMuted ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
             >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
             </button>
             <button 
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-6 rounded-full transition-all ${isVideoOff ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
             >
                {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
             </button>
             <button 
               onClick={() => navigate('/dashboard')}
               className="p-6 bg-rose-600 hover:bg-rose-500 text-white rounded-full transition-all shadow-2xl shadow-rose-600/20"
             >
                <PhoneOff className="w-6 h-6" />
             </button>
          </div>

          <div className="absolute right-12 flex items-center gap-4">
             <button className="p-4 text-white/40 hover:text-white transition-colors">
                <Users className="w-6 h-6" />
             </button>
             <button className="p-4 text-white/40 hover:text-white transition-colors">
                <MessageSquare className="w-6 h-6" />
             </button>
             <button className="p-4 text-white/40 hover:text-white transition-colors">
                <MoreVertical className="w-6 h-6" />
             </button>
          </div>
       </div>
    </div>
  );
}
