import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Send, Video, Image as ImageIcon, 
  Type, Languages, Subtitles, Wand2, 
  RefreshCw, Copy, Check, Download,
  Volume2, Music, FileText, Upload, X, Globe
} from 'lucide-react';

type GenType = 'script' | 'thumbnail' | 'translation' | 'subtitles' | 'voiceover';

const INDIAN_LANGUAGES = [
  'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 
  'Marathi', 'Bengali', 'Odia', 'Gujarati', 'Punjabi', 
  'Assamese', 'Konkani', 'Sanskrit'
];

export default function AIContentGenerator() {
  const [activeType, setActiveType] = useState<GenType>('script');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setResult(null);
    
    // Mock generation based on type
    setTimeout(() => {
      setIsGenerating(false);
      
      if (activeType === 'subtitles') {
        setResult(`[00:01.00] In the heart of the village... (${selectedLanguage})\n[00:04.50] The traditions were passed down... (${selectedLanguage})\n[00:08.20] From elders to the youth... (${selectedLanguage})`);
      } else if (activeType === 'script') {
        setResult("The Whispering Banyan of Mysore is not just a tree; it's a living archive. Veera, a curious boy, discovers that its roots hold the memories of generations...");
      } else {
        setResult("Mock AI generation completed for " + activeType + " in " + selectedLanguage);
      }
    }, 2500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const tools: { id: GenType; label: string; icon: any; color: string }[] = [
    { id: 'script', label: 'AI Script', icon: FileText, color: 'text-indigo-500' },
    { id: 'thumbnail', label: 'Thumbnails', icon: ImageIcon, color: 'text-rose-500' },
    { id: 'translation', label: 'Translate', icon: Languages, color: 'text-amber-500' },
    { id: 'subtitles', label: 'Captions', icon: Subtitles, color: 'text-emerald-500' },
    { id: 'voiceover', label: 'Voiceover', icon: Volume2, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen pt-12 pb-20 px-6 max-w-7xl mx-auto space-y-12">
       <header className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="h-1 w-12 bg-amber-500 rounded-full" />
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600">Cognitive Creator Suite</p>
          </div>
          <h1 className="text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85] uppercase">
             AI <br /> <span className="text-amber-500">Multiverse</span>
          </h1>
       </header>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Tools Sidebar */}
          <div className="lg:col-span-3 space-y-4">
             {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    setActiveType(tool.id);
                    setResult(null);
                  }}
                  className={`w-full flex items-center gap-4 p-6 rounded-[32px] border transition-all text-left ${
                    activeType === tool.id 
                      ? 'bg-white dark:bg-white/5 border-amber-500 shadow-xl' 
                      : 'bg-transparent border-slate-200 dark:border-white/10 hover:border-slate-400 opacity-60'
                  }`}
                >
                   <div className={`p-3 rounded-2xl bg-slate-100 dark:bg-white/5 ${tool.color}`}>
                      <tool.icon className="w-5 h-5" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{tool.label}</span>
                </button>
             ))}
          </div>

          {/* Main Interface */}
          <div className="lg:col-span-9 space-y-8">
             <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px] p-10 space-y-10 relative overflow-hidden">
                <Sparkles className="absolute -top-12 -right-12 w-48 h-48 text-amber-500/5 rotate-12" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                   <div className="space-y-4">
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                         Magic <span className="text-amber-500">{activeType.charAt(0).toUpperCase() + activeType.slice(1)}</span>
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-white/40 max-w-xl font-medium">
                         {activeType === 'subtitles' 
                           ? 'Upload your video and we\'ll generate accurate captions in your chosen Indian language.' 
                           : 'Describe your cultural concept. Our localized AI models understand nuances of Indian traditions.'}
                      </p>
                   </div>

                   {/* Language Selector */}
                   <div className="flex flex-col gap-2 w-full md:w-auto">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                         <Globe className="w-3 h-3" /> Target Language
                      </label>
                      <select 
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-amber-500 transition-all cursor-pointer"
                      >
                         {INDIAN_LANGUAGES.map(lang => (
                           <option key={lang} value={lang}>{lang}</option>
                         ))}
                      </select>
                   </div>
                </div>

                <div className="space-y-6 relative z-10">
                   {/* Conditional Upload for Subtitles */}
                   {activeType === 'subtitles' && (
                     <div className="space-y-4">
                        <input 
                           type="file" 
                           ref={fileInputRef}
                           onChange={handleFileChange}
                           className="hidden" 
                           accept="video/*"
                        />
                        {!uploadedFile ? (
                           <div 
                              onClick={() => fileInputRef.current?.click()}
                              className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[32px] p-12 flex flex-col items-center justify-center gap-4 hover:border-amber-500 hover:bg-amber-500/5 transition-all cursor-pointer group"
                           >
                              <div className="p-5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:text-amber-500 transition-colors">
                                 <Upload className="w-8 h-8" />
                              </div>
                              <div className="text-center">
                                 <p className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Drop your video here</p>
                                 <p className="text-xs text-slate-400 font-medium mt-1">MP4, MOV, WEBM up to 500MB</p>
                              </div>
                           </div>
                        ) : (
                           <div className="flex items-center justify-between p-6 bg-slate-900 dark:bg-white rounded-[32px] text-white dark:text-slate-900">
                              <div className="flex items-center gap-4">
                                 <div className="p-3 bg-white/10 dark:bg-black/10 rounded-xl">
                                    <Video className="w-5 h-5" />
                                 </div>
                                 <div className="space-y-1">
                                    <p className="text-sm font-black uppercase tracking-tight">{uploadedFile.name}</p>
                                    <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB &bull; Ready to process</p>
                                 </div>
                              </div>
                              <button 
                                 onClick={() => setUploadedFile(null)}
                                 className="p-3 hover:bg-white/10 dark:hover:bg-black/10 rounded-xl transition-all"
                              >
                                 <X className="w-5 h-5" />
                              </button>
                           </div>
                        )}
                     </div>
                   )}

                   <div className="relative group">
                      <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={activeType === 'subtitles' ? 'Add any context or special instructions (optional)...' : "e.g. Write a short video script about the significance of Kolam art during Pongal..."} 
                        className={`w-full bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5 rounded-[32px] p-10 text-lg font-medium text-slate-700 dark:text-white/80 outline-none focus:border-amber-500 transition-all resize-none shadow-inner ${activeType === 'subtitles' ? 'min-h-[150px]' : 'min-h-[300px]'}`}
                      />
                      <div className="absolute bottom-6 right-6 flex gap-3">
                         <button className="p-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-400 hover:text-amber-500 transition-colors">
                            <Wand2 className="w-5 h-5" />
                         </button>
                         <button 
                           onClick={handleGenerate}
                           disabled={isGenerating || (activeType !== 'subtitles' && !prompt) || (activeType === 'subtitles' && !uploadedFile)}
                           className="flex items-center gap-3 px-10 py-4 bg-amber-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                         >
                            {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            Execute
                         </button>
                      </div>
                   </div>
                </div>

                <AnimatePresence>
                   {result && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-10 bg-indigo-600/5 border border-indigo-500/20 rounded-[40px] space-y-6 relative group"
                      >
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">AI Output Pipeline</span>
                               {activeType === 'subtitles' && (
                                 <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase rounded-full tracking-widest uppercase">SRT Ready</span>
                               )}
                            </div>
                            <div className="flex gap-2">
                               <button className="p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-400 hover:text-indigo-500 transition-all"><Copy className="w-4 h-4" /></button>
                               <button className="p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-400 hover:text-indigo-500 transition-all"><Download className="w-4 h-4" /></button>
                            </div>
                         </div>
                         <div className="text-xl font-medium text-slate-700 dark:text-white/80 leading-relaxed italic whitespace-pre-line">
                            {result}
                         </div>
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>

             {/* Bottom Tips */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-indigo-600 rounded-[40px] p-8 text-white space-y-4">
                   <h4 className="text-xl font-black uppercase tracking-tighter italic">Pro Tip: Cultural Grounding</h4>
                   <p className="text-sm text-white/60 font-medium">Use specific regional terms like 'Rangoli' vs 'Kolam' to get more accurate creative outputs from the AI engine.</p>
                </div>
                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] p-8 space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Engine Status</span>
                   </div>
                   <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">Gemini 1.5 Pro Integrated &bull; Verified</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
