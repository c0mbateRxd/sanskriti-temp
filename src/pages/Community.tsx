import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Plus, Send, Image as ImageIcon, MapPin, CheckCircle2 } from 'lucide-react';
import { submitContribution } from '../firebase/firestore';
import { INDIA_STATES } from '../data/india-map-data';

const Community = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    state: '',
    category: 'Folklore'
  });
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContribution(formData, image || undefined);
      setSuccess(true);
      setFormData({ title: '', content: '', state: '', category: 'Folklore' });
      setImage(null);
    } catch (error) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_350px] gap-12">
        {/* Form */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tighter serif">Share Your <span className="text-saffron italic">Heritage</span></h1>
            <p className="text-white/50 text-lg font-light">
              Every tradition starts with a story. Contribute your knowledge and help us preserve India's cultural richness for generations to come.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/40 uppercase tracking-widest">Story Title</label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="The Legend of the Golden Temple..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-saffron/50 font-medium"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/40 uppercase tracking-widest">Region / State</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-white/30 w-5 h-5 pointer-events-none" />
                  <select 
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-saffron/50 appearance-none"
                  >
                    <option value="" disabled className="bg-[#0a0a0a]">Select State</option>
                    {Object.values(INDIA_STATES).map(s => (
                      <option key={s.name} value={s.name} className="bg-[#0a0a0a]">{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/40 uppercase tracking-widest">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-saffron/50 appearance-none"
                >
                  <option value="Folklore" className="bg-[#0a0a0a]">Folklore</option>
                  <option value="Art" className="bg-[#0a0a0a]">Art & Craft</option>
                  <option value="Festival" className="bg-[#0a0a0a]">Festival</option>
                  <option value="Personal" className="bg-[#0a0a0a]">Personal Experience</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/40 uppercase tracking-widest">The Narrative</label>
              <textarea 
                required
                rows={6}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Share the history, traditions, or stories associated with this culture..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-saffron/50 font-medium resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/40 uppercase tracking-widest">Visual Asset</label>
              <div 
                className="w-full border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:bg-white/5 hover:border-saffron/50 transition-all cursor-pointer relative"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                {image ? (
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-10 h-10 text-india-green" />
                    <span className="text-sm font-medium">{image.name}</span>
                    <button type="button" onClick={(e) => {e.stopPropagation(); setImage(null)}} className="text-xs text-red-400 hover:underline">Remove</button>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-10 h-10 text-white/20" />
                    <div className="text-center">
                      <p className="font-semibold">Click to upload or drag and drop</p>
                      <p className="text-xs text-white/40 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                    </div>
                  </>
                )}
                <input 
                  id="file-upload"
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                />
              </div>
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full py-4 bg-white text-navy-blue font-black tracking-widest uppercase rounded-2xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : success ? (
                <><CheckCircle2 className="w-5 h-5" /> Submitted Successfully</>
              ) : (
                <><Send className="w-5 h-5" /> Publish to Sanskriti AI</>
              )}
            </button>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="hidden md:block space-y-6 pt-24">
          <div className="glass-card p-6 border-t-2 border-t-saffron">
            <h4 className="text-saffron font-bold text-sm uppercase tracking-widest mb-4">Why Contribute?</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-white/70">
                <div className="shrink-0 w-5 h-5 rounded-full bg-saffron/20 flex items-center justify-center text-saffron text-[10px]">1</div>
                Preserve disappearing regional art forms.
              </li>
              <li className="flex gap-3 text-sm text-white/70">
                <div className="shrink-0 w-5 h-5 rounded-full bg-saffron/20 flex items-center justify-center text-saffron text-[10px]">2</div>
                Impact global awareness of Indian heritage.
              </li>
              <li className="flex gap-3 text-sm text-white/70">
                <div className="shrink-0 w-5 h-5 rounded-full bg-saffron/20 flex items-center justify-center text-saffron text-[10px]">3</div>
                Connect with cultural enthusiasts worldwide.
              </li>
            </ul>
          </div>

          <div className="glass-card p-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-india-green/10 pointer-events-none" />
            <h4 className="font-bold relative z-10">Quality Guidelines</h4>
            <p className="text-xs text-white/60 mt-2 relative z-10">
              Ensure stories are original and factually rooted. Respect diverse viewpoints and maintain educational clarity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
