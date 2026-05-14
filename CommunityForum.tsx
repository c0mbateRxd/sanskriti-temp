import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, Users, MessageCircle, Heart, 
  Share2, Search, Filter, Plus, User, Image, 
  Hash, Globe, Lock
} from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function CommunityForum() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'All' | 'Discussion' | 'QA' | 'Events'>('All');

  return (
    <div className="min-h-screen pt-12 pb-20 px-6 max-w-7xl mx-auto space-y-12">
       {/* Header */}
       <header className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-rose-500 rounded-full" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-600">Global Cultural Forum</p>
             </div>
             <h1 className="text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85] uppercase">
                Community <br /> <span className="text-zinc-300 dark:text-white/10 italic">Nexus</span>
             </h1>
          </div>

          <button className="flex items-center gap-3 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all">
             <Plus className="w-4 h-4" />
             Start Discussion
          </button>
       </header>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Side Tabs */}
          <div className="lg:col-span-3 space-y-4">
             <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[32px] p-4 flex flex-col gap-2">
                {[
                  { id: 'All', icon: Globe, label: 'Global Feed' },
                  { id: 'Discussion', icon: MessageSquare, label: 'Discussion' },
                  { id: 'QA', icon: MessageCircle, label: 'Q&A' },
                  { id: 'Events', icon: Users, label: 'Events' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab.id 
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                        : 'text-slate-500 dark:text-white/40 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
             </div>

             <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[32px] p-8 space-y-6">
                <h4 className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest italic">Trending Topics</h4>
                <div className="space-y-4">
                   {['#KanchipuramSilk', '#Kathakali', '#VocalBasics', '#OrganicDye'].map(tag => (
                     <p key={tag} className="text-xs font-bold text-slate-600 dark:text-white/60 hover:text-rose-500 cursor-pointer transition-colors">{tag}</p>
                   ))}
                </div>
             </div>
          </div>

          {/* Discussion Feed */}
          <div className="lg:col-span-9 space-y-8">
             <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-indigo-600 rounded-3xl blur opacity-25 group-focus-within:opacity-50 transition duration-500" />
                <div className="relative flex items-center bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-4 pr-6">
                   <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 mr-4 flex-shrink-0">
                      <img src={user?.photoURL || 'https://i.pravatar.cc/100'} alt="" />
                   </div>
                   <input 
                     type="text" 
                     placeholder="Share a cultural insight or ask a master..." 
                     className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-900 dark:text-white px-2"
                   />
                   <div className="flex gap-4">
                      <Image className="w-5 h-5 text-slate-400" />
                      <Lock className="w-5 h-5 text-slate-400" />
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                {[
                  { name: 'Arjun Ravi', role: 'Student', time: '2h ago', content: 'Does anyone have a contact for original Mysore Sandalwood carvings? I heard most of them are faux now.', likes: 12, replies: 4 },
                  { name: 'Meera K.', role: 'Mentor', time: '5h ago', content: 'Today\'s workshop on Tanjore sketching was enlightening! Thank you to all 15 participants who joined from Europe.', likes: 45, replies: 12 }
                ].map((post, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
                    className="p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] space-y-6"
                  >
                     <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                              <User className="w-5 h-5 text-slate-400" />
                           </div>
                           <div>
                              <h4 className="text-sm font-black text-slate-900 dark:text-white">{post.name}</h4>
                              <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20">{post.role} &bull; {post.time}</p>
                           </div>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Hash className="w-4 h-4" /></button>
                     </div>

                     <p className="text-lg font-medium text-slate-600 dark:text-white/60 leading-relaxed">
                        {post.content}
                     </p>

                     <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                        <div className="flex gap-6">
                           <button className="flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors">
                              <Heart className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest">{post.likes}</span>
                           </button>
                           <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-500 transition-colors">
                              <MessageSquare className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest">{post.replies}</span>
                           </button>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Share2 className="w-4 h-4" /></button>
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}
