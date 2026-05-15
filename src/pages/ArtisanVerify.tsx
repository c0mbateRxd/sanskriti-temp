import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useUser } from '../context/UserContext';
import { CheckCircle2 } from 'lucide-react';

const SPECIALIZATIONS = [
  'Bharatanatyam', 'Kathak', 'Yakshagana', 'Pottery', 
  'Madhubani Painting', 'Tanjore Painting', 'Warli Art',
  'Textile Weaving', 'Wood Carving', 'Tribal Art', 'Folk Music', 'Other'
];

const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export default function ArtisanVerify() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.displayName || '',
    specialization: '',
    experience: '',
    state: '',
    district: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      await setDoc(doc(db, 'artisanApplications', user.uid), {
        uid: user.uid,
        name: form.fullName,
        specialization: form.specialization,
        experience: form.experience,
        state: form.state,
        district: form.district,
        description: form.description,
        governmentIdUrl: '',
        portfolioImages: [],
        sampleVideoUrl: '',
        verificationStatus: 'pending',
        createdAt: Timestamp.now()
      });
      await setDoc(doc(db, 'users', user.uid), {
        role: 'artisan',
        verificationStatus: 'pending'
      }, { merge: true });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full text-center space-y-8 p-12 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px]"
        >
          <CheckCircle2 className="w-20 h-20 mx-auto text-emerald-500" />
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
              Application Submitted!
            </h2>
            <p className="text-slate-500 dark:text-white/40 font-medium leading-relaxed">
              Your artisan verification is under review. We'll notify you once approved. This usually takes 24-48 hours.
            </p>
          </div>
          <div className="px-6 py-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
            <p className="text-amber-600 font-black uppercase tracking-widest text-xs">Verification Under Review</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-indigo-500 rounded-full" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Artisan Portal</p>
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
            Artisan <span className="text-indigo-500 italic">Verification</span>
          </h1>
          <p className="text-slate-500 dark:text-white/40 font-medium">
            Fill in your details to apply as a verified artisan/mentor on Sanskriti AI.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name *</label>
            <input
              required
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 font-medium outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Specialization */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Art Specialization *</label>
            <select
              required
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 font-medium outline-none focus:border-indigo-500 transition-all appearance-none"
            >
              <option value="">Select specialization</option>
              {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Years of Experience *</label>
            <input
              required
              name="experience"
              value={form.experience}
              onChange={handleChange}
              type="number"
              min="1"
              max="60"
              placeholder="e.g. 10"
              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 font-medium outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* State & District */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">State *</label>
              <select
                required
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 font-medium outline-none focus:border-indigo-500 transition-all appearance-none"
              >
                <option value="">Select state</option>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">District *</label>
              <input
                required
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="e.g. Mysore"
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 font-medium outline-none focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">About You & Your Art *</label>
            <textarea
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Tell us about your craft, your background, and what you'd like to teach..."
              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 font-medium outline-none focus:border-indigo-500 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
          >
            {loading ? 'Submitting...' : 'Submit for Verification'}
          </button>
        </form>
      </div>
    </div>
  );
}
