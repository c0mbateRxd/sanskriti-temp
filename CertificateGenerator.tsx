import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Download, Share2, Award, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

interface CertificateProps {
  userName: string;
  courseName: string;
  mentorName: string;
  date: string;
  state: string;
}

export default function CertificateGenerator({ userName, courseName, mentorName, date, state }: CertificateProps) {
  const certRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // Mock download logic
    alert('Certificate downloading...');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-12 px-6">
       <div className="text-center space-y-4">
          <Award className="w-12 h-12 mx-auto text-amber-500" />
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Your Cultural <br /> Achievement</h2>
          <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.4em]">Official Sanskriti Certification</p>
       </div>

       {/* Certificate Layout */}
       <motion.div 
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         id="certificate-view"
         className="relative aspect-[1.414/1] w-full bg-white dark:bg-zinc-950 border-[12px] border-slate-900 dark:border-white p-12 overflow-hidden shadow-2xl"
       >
          {/* Decorative Borders */}
          <div className="absolute inset-4 border border-slate-200 dark:border-white/10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full -ml-16 -mb-16 pointer-events-none" />

          <div className="h-full flex flex-col justify-between items-center text-center relative z-10">
             <div className="space-y-2">
                <div className="flex items-center justify-center gap-3 mb-4">
                   <div className="h-0.5 w-12 bg-slate-400" />
                   <Sparkles className="w-5 h-5 text-amber-500" />
                   <div className="h-0.5 w-12 bg-slate-400" />
                </div>
                <h3 className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.5em]">Certificate of Excellence</h3>
             </div>

             <div className="space-y-6">
                <p className="text-sm font-medium italic text-slate-500">This is to officially recognize the progress of</p>
                <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none border-b-2 border-slate-900 dark:border-white pb-4 px-12 inline-block">
                   {userName}
                </h1>
                <p className="text-sm font-medium italic text-slate-500">for successfully mastering the nuances of</p>
                <h2 className="text-2xl font-black text-amber-600 uppercase tracking-widest">{courseName}</h2>
             </div>

             <div className="w-full flex justify-between items-end pb-8">
                <div className="text-left space-y-1">
                   <p className="text-[8px] font-black uppercase text-slate-400">Mentor In Charge</p>
                   <p className="text-sm font-black text-slate-900 dark:text-white uppercase">{mentorName}</p>
                   <p className="text-[8px] font-bold text-slate-400">{state}, India</p>
                </div>

                <div className="flex flex-col items-center">
                   <ShieldCheck className="w-12 h-12 text-slate-900 dark:text-white" />
                   <p className="text-[6px] font-black uppercase tracking-widest mt-2">Sanskriti Verified</p>
                </div>

                <div className="text-right space-y-1">
                   <p className="text-[8px] font-black uppercase text-slate-400">Dated Issued</p>
                   <p className="text-sm font-black text-slate-900 dark:text-white uppercase">{date}</p>
                   <p className="text-[8px] font-bold text-slate-400">Cert ID: SN-2026-X49</p>
                </div>
             </div>
          </div>
       </motion.div>

       <div className="flex justify-center gap-6">
          <button 
            onClick={handleDownload}
            className="flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-all"
          >
             <Download className="w-4 h-4" />
             Download PDF
          </button>
          <button className="flex items-center gap-3 px-8 py-4 border border-slate-200 dark:border-white/10 text-slate-400 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
             <Share2 className="w-4 h-4" />
             Add to LinkedIn
          </button>
       </div>
    </div>
  );
}
