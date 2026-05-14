import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, Scissors, Wand2, Music, Mic, 
  Subtitles, Play, Pause, SkipBack, 
  SkipForward, Plus, Upload, X, 
  Layers, Volume2, Save, Share2, 
  Layers2, Sparkles, RefreshCcw, 
  Type, Languages, Download, MoreHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Tab = 'layers' | 'effects' | 'audio' | 'ai';

export default function VideoEditor() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('layers');
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120); // Simulated 2 mins
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [captions, setCaptions] = useState<{ id: string; text: string; start: string }[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedVideo(file);
  };

  const generateAICaptions = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      setCaptions([
        { id: '1', text: 'Namaste and welcome to our cultural journey.', start: '00:01' },
        { id: '2', text: 'Today we explore the lost art of Rogan painting.', start: '00:05' },
        { id: '3', text: 'Notice the intricate use of castor oil and pigments.', start: '00:12' },
      ]);
      setIsGeneratingAI(false);
      setActiveTab('ai');
    }, 2000);
  };

  const timelineMarkers = Array.from({ length: 12 }, (_, i) => i * 10);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
       {/* Top Navigation */}
       <nav className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-black/40 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-8">
             <button 
               onClick={() => navigate('/creator-dashboard')}
               className="p-3 hover:bg-white/5 rounded-2xl transition-all text-slate-400 hover:text-white"
             >
                <X className="w-6 h-6" />
             </button>
             <div className="space-y-1">
                <h1 className="text-sm font-black uppercase tracking-widest leading-none">Studio Editor <span className="text-indigo-500">v1.2</span></h1>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{uploadedVideo ? uploadedVideo.name : 'Untitled Project'}</p>
             </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all">
                <Save className="w-4 h-4" /> Save Draft
             </button>
             <button className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-indigo-500/20 transition-all">
                <Share2 className="w-4 h-4" /> Export
             </button>
          </div>
       </nav>

       <div className="flex-1 flex overflow-hidden">
          {/* Main Sidebar Tools */}
          <aside className="w-24 border-r border-white/5 flex flex-col items-center py-8 gap-6 bg-black/20 shrink-0">
             {[
               { id: 'layers', icon: Layers2, label: 'Layers' },
               { id: 'effects', icon: Wand2, label: 'FX' },
               { id: 'audio', icon: Music, label: 'Audio' },
               { id: 'ai', icon: Sparkles, label: 'AI' },
             ].map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTab(tool.id as Tab)}
                  className={`group flex flex-col items-center gap-2 transition-all ${activeTab === tool.id ? 'text-indigo-500' : 'text-slate-500 hover:text-white'}`}
                >
                   <div className={`p-4 rounded-2xl transition-all ${activeTab === tool.id ? 'bg-indigo-500/10' : 'bg-transparent group-hover:bg-white/5'}`}>
                      <tool.icon className="w-6 h-6" />
                   </div>
                   <span className="text-[9px] font-black uppercase tracking-widest">{tool.label}</span>
                </button>
             ))}
          </aside>

          {/* Canvas & Timeline Area */}
          <main className="flex-1 flex flex-col min-w-0 bg-slate-950/50">
             {/* Preview Canvas */}
             <div className="flex-1 relative flex items-center justify-center p-12">
                <div className="w-full max-w-4xl aspect-video bg-black rounded-[40px] shadow-[0_0_100px_-20px_rgba(79,70,229,0.2)] border border-white/5 relative overflow-hidden group">
                   {!uploadedVideo ? (
                     <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-white/[0.02] transition-all"
                     >
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-all">
                           <Upload className="w-8 h-8" />
                        </div>
                        <div className="text-center space-y-2">
                           <p className="text-xs font-black uppercase tracking-[0.3em]">Load Master Footage</p>
                           <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Supports 4K RAW, MP4, MOV</p>
                        </div>
                        <input 
                           type="file" 
                           ref={fileInputRef} 
                           onChange={handleFileChange} 
                           className="hidden" 
                           accept="video/*" 
                        />
                     </div>
                   ) : (
                     <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Play className="w-16 h-16 text-white opacity-40" />
                        </div>
                        {/* Simulation Overlay */}
                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                           <div className="flex gap-4">
                              <SkipBack className="w-5 h-5 text-slate-400" />
                              <button onClick={() => setIsPlaying(!isPlaying)}>
                                 {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                              </button>
                              <SkipForward className="w-5 h-5 text-slate-400" />
                           </div>
                           <div className="flex-1 px-8">
                              <div className="h-1 bg-white/10 rounded-full relative">
                                 <div className="absolute top-0 left-0 h-full w-1/3 bg-indigo-500 rounded-full" />
                                 <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-xl" />
                              </div>
                           </div>
                           <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest">00:45 / 02:00</span>
                        </div>
                     </div>
                   )}
                </div>
             </div>

             {/* Timeline Area */}
             <div className="h-80 bg-slate-950 border-t border-white/5 flex flex-col shrink-0">
                <div className="h-10 border-b border-white/5 flex items-center px-4 justify-between bg-black/20">
                   <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-500 transition-all">
                         <Scissors className="w-4 h-4" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Split</span>
                      </button>
                      <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-500 transition-all">
                         <X className="w-4 h-4" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Delete</span>
                      </button>
                   </div>
                   <div className="flex items-center gap-4">
                      <Volume2 className="w-4 h-4 text-slate-600" />
                      <div className="w-24 h-1 bg-white/10 rounded-full">
                         <div className="w-3/4 h-full bg-slate-400 rounded-full" />
                      </div>
                   </div>
                </div>

                <div className="flex-1 overflow-x-auto relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                   {/* Timeline Grid */}
                   <div className="absolute top-0 left-0 right-0 h-8 flex items-end px-4 border-b border-white/5 bg-black/40">
                      {timelineMarkers.map(m => (
                        <div key={m} className="flex-1 border-l border-white/10 h-3 relative">
                           <span className="absolute -top-6 left-1 text-[8px] font-mono text-slate-600">{m}s</span>
                        </div>
                      ))}
                   </div>

                   {/* Tracks */}
                   <div className="mt-12 space-y-2 p-4 min-w-[2000px]">
                      {/* Video Track */}
                      <div className="flex items-center gap-4 group">
                         <div className="w-24 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-500 shrink-0">
                            <Video className="w-5 h-5" />
                         </div>
                         <div className="flex-1 h-14 bg-indigo-500/20 rounded-xl border border-indigo-500/30 flex items-center px-6 relative group/clip cursor-move">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Main Footage Layer</span>
                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-indigo-500 rounded-r-xl cursor-ew-resize opacity-0 group-hover/clip:opacity-100 transition-all" />
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-indigo-500 rounded-l-xl cursor-ew-resize opacity-0 group-hover/clip:opacity-100 transition-all" />
                         </div>
                      </div>

                      {/* Audio Track */}
                      <div className="flex items-center gap-4">
                         <div className="w-24 h-14 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-center text-rose-500 shrink-0">
                            <Music className="w-5 h-5" />
                         </div>
                         <div className="w-1/2 h-14 bg-rose-500/20 rounded-xl border border-rose-500/30 flex items-center px-6">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Background Ambience (Indian Folk)</span>
                         </div>
                      </div>

                      {/* Caption Track */}
                      <div className="flex items-center gap-4">
                         <div className="w-24 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
                            <Subtitles className="w-5 h-5" />
                         </div>
                         {captions.length > 0 ? (
                           <div className="flex gap-2">
                             {captions.map(c => (
                               <div key={c.id} className="h-14 px-6 bg-emerald-500/20 rounded-xl border border-emerald-500/30 flex items-center shrink-0">
                                  <span className="text-[8px] font-bold text-white/80 max-w-[100px] truncate">{c.text}</span>
                               </div>
                             ))}
                           </div>
                         ) : (
                           <button 
                             onClick={generateAICaptions}
                             className="h-14 px-6 bg-emerald-500/5 hover:bg-emerald-500/10 border-2 border-dashed border-emerald-500/20 rounded-xl flex items-center gap-3 transition-all"
                           >
                              <Sparkles className="w-4 h-4 text-emerald-500" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Auto-Generate AI Captions</span>
                           </button>
                         )}
                      </div>
                   </div>

                   {/* Playhead */}
                   <div className="absolute top-0 bottom-0 left-[33%] w-px bg-white z-20 pointer-events-none">
                      <div className="w-3 h-3 bg-white rounded-full -translate-x-1/2" />
                   </div>
                </div>
             </div>
          </main>

          {/* Properties Panel */}
          <aside className="w-80 border-l border-white/5 bg-black/40 shrink-0 overflow-y-auto">
             <div className="p-8 space-y-10">
                <header className="space-y-4">
                   <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Tool</h2>
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-2xl">
                         {activeTab === 'layers' && <Layers className="w-5 h-5" />}
                         {activeTab === 'effects' && <Wand2 className="w-5 h-5" />}
                         {activeTab === 'audio' && <Music className="w-5 h-5" />}
                         {activeTab === 'ai' && <Sparkles className="w-5 h-5" />}
                      </div>
                      <h3 className="text-lg font-black uppercase tracking-tighter italic">{activeTab}</h3>
                   </div>
                </header>

                <div className="space-y-8">
                   {activeTab === 'effects' && (
                     <div className="grid grid-cols-2 gap-4">
                        {[
                          { name: 'Cinematic', filter: 'sepia(20%)' },
                          { name: 'Traditional', filter: 'contrast(120%)' },
                          { name: 'Vibrant', filter: 'saturate(150%)' },
                          { name: 'Noir', filter: 'grayscale(100%)' },
                        ].map(f => (
                          <button key={f.name} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-indigo-500 transition-all text-center space-y-2 group">
                             <div className="aspect-square bg-slate-800 rounded-lg group-hover:scale-95 transition-all" style={{ filter: f.filter }} />
                             <span className="text-[9px] font-black uppercase tracking-widest opacity-60">{f.name}</span>
                          </button>
                        ))}
                     </div>
                   )}

                   {activeTab === 'audio' && (
                     <div className="space-y-6">
                        <div className="space-y-4">
                           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Track Selection</h4>
                           <div className="space-y-2">
                              {['Sitar Meditation', 'Rajasthani Folk', 'Bollywood Lofi'].map(track => (
                                <button key={track} className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all">
                                   <div className="flex items-center gap-3">
                                      <Music className="w-4 h-4 text-rose-500" />
                                      <span className="text-[10px] font-bold tracking-widest">{track}</span>
                                   </div>
                                   <Plus className="w-3 h-3" />
                                </button>
                              ))}
                           </div>
                        </div>

                        <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-3xl space-y-4">
                           <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Voice-over</span>
                              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                           </div>
                           <button className="w-full py-4 bg-rose-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-rose-500/20 flex items-center justify-center gap-3">
                              <Mic className="w-4 h-4" /> Start Recording
                           </button>
                        </div>
                     </div>
                   )}

                   {activeTab === 'ai' && (
                     <div className="space-y-6">
                        <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl space-y-4">
                           <div className="flex items-center justify-between">
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Multilingual Engine</h4>
                              <Sparkles className="w-4 h-4 text-emerald-500" />
                           </div>
                           <p className="text-[10px] font-medium text-emerald-500/60 leading-relaxed uppercase">
                              Powered by Gemini 1.5 Pro. Preserves cultural context in 12+ Indian languages.
                           </p>
                           <button 
                             onClick={generateAICaptions}
                             disabled={isGeneratingAI}
                             className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 transition-all"
                           >
                              {isGeneratingAI ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Subtitles className="w-4 h-4" />}
                              {isGeneratingAI ? 'Processing...' : 'Auto-Captions'}
                           </button>
                        </div>

                        <AnimatePresence>
                           {captions.length > 0 && (
                             <motion.div 
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               className="space-y-3"
                             >
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Generated Segments</h4>
                                {captions.map(c => (
                                  <div key={c.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2 group">
                                     <div className="flex justify-between items-center">
                                        <span className="text-[8px] font-mono text-indigo-400 font-bold tracking-tight">[{c.start}]</span>
                                        <MoreHorizontal className="w-3 h-3 text-slate-600" />
                                     </div>
                                     <p className="text-[10px] font-bold text-slate-300 leading-relaxed italic">"{c.text}"</p>
                                  </div>
                                ))}
                             </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                   )}

                   {activeTab === 'layers' && (
                     <div className="space-y-4">
                        {[
                          { name: 'Video Layer 0', icon: Video, color: 'text-indigo-400' },
                          { name: 'Audio Track 1', icon: Music, color: 'text-rose-400' },
                          { name: 'AI Captions', icon: Subtitles, color: 'text-emerald-400' },
                        ].map((layer, i) => (
                          <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <layer.icon className={`w-4 h-4 ${layer.color}`} />
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{layer.name}</span>
                             </div>
                             <MoreHorizontal className="w-4 h-4 text-slate-600" />
                          </div>
                        ))}
                        <button className="w-full p-4 border border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-3 text-slate-500 hover:text-white transition-all">
                           <Plus className="w-4 h-4" />
                           <span className="text-[10px] font-black uppercase tracking-widest">Add Track</span>
                        </button>
                     </div>
                   )}
                </div>
             </div>
          </aside>
       </div>
    </div>
  );
}
