import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Sparkles, Loader2, Minimize2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { STATES_DATA } from '../data/states';
import { PRODUCTS_DATA } from '../data/products';

export default function Chatbot() {
  const { t, language } = useLanguage();
  const { theme } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: t('chatbot_greeting') }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const statesContext = STATES_DATA.map(s => 
        `${s.name.en}: ${s.description.en} (Art: ${s.art}, Textile: ${s.textile})`
      ).join('\n');

      const productsContext = PRODUCTS_DATA.map(p => 
        `${p.name} from ${p.state}: ₹${p.price}. ${p.description} (Category: ${p.category})`
      ).join('\n');

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: `You are the "Sanskriti Guide", a friendly AI expert on Indian culture and the Craft Marketplace. 
          Use this context to help users explore states and shop for authentic crafts:
          
          CULTURAL DATA:
          ${statesContext}
          
          MARKETPLACE PRODUCTS:
          ${productsContext}
          
          Always respond in the current user language: ${language === 'hi' ? 'Hindi' : language === 'kn' ? 'Kannada' : 'English'}.
          If a user asks for shopping advice, recommend specific items from the Marketplace.
          Keep answers under 100 words. Highlight unique cultural aspects.`,
        },
      });

      const botResponse = response.text || "I apologize, but I am unable to connect to the heritage archives right now.";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Namaste, I'm having trouble connecting to the cultural cloud. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`flex flex-col mb-4 w-[400px] max-w-[calc(100vw-2rem)] rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-950 ${
              isMinimized ? 'h-auto' : 'h-[600px] max-h-[70vh]'
            }`}
          >
            {/* Header */}
            <div className={`p-6 flex items-center justify-between border-b border-slate-100 dark:border-white/10 bg-gradient-to-r from-orange-500/10 via-rose-500/10 to-indigo-500/10`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-tighter text-slate-900 dark:text-white leading-tight">Sanskriti Guide</h3>
                  <div className="flex items-center gap-1.5 opacity-60">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white">Active Heritage AI</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors text-slate-400"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center border ${
                          msg.role === 'user' 
                            ? 'bg-slate-900 dark:bg-white border-slate-800 dark:border-white text-white dark:text-slate-900' 
                            : 'bg-orange-500/10 border-orange-500/20 text-orange-500'
                        }`}>
                          {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={`p-4 rounded-3xl text-sm font-medium leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-tr-none'
                            : 'bg-orange-500/5 dark:bg-orange-500/10 text-slate-700 dark:text-white rounded-tl-none border border-orange-500/10'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 items-center bg-slate-50 dark:bg-white/5 p-4 rounded-3xl">
                        <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20">Consulting Archives...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-6 border-t border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-950/50 backdrop-blur-md">
                  <div className="relative flex items-center group">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask about Indian heritage..."
                      className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-5 pr-14 text-sm font-bold focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 transition-all outline-none"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 p-3 bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-4 px-2 opacity-40">
                    <Sparkles className="w-3 h-3 text-orange-500" />
                    <p className="text-[8px] font-black uppercase tracking-[0.2em]">Powered by Gemini Global Intelligence</p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500" />
        <div className="relative bg-white dark:bg-slate-900 p-4 rounded-full shadow-2xl flex items-center justify-center border-2 border-white dark:border-slate-800">
          <MessageSquare className="w-6 h-6 text-orange-500" />
        </div>
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white dark:border-zinc-950 animate-bounce" />
        )}
      </motion.button>
    </div>
  );
}
