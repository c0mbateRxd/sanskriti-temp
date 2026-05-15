import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useUser } from '../context/UserContext';

const INTERESTS = [
  'Dance', 'Pottery', 'Paintings', 'Music', 
  'Folklore', 'Textile Arts', 'Tribal Arts', 'Mythology'
];

export default function Onboarding() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState<'role' | 'interests'>('role');
  const [role, setRole] = useState<'explorer' | 'artisan' | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = async (selectedRole: 'explorer' | 'artisan') => {
    setRole(selectedRole);
    if (selectedRole === 'artisan') {
      await saveAndRedirect(selectedRole, []);
      navigate('/artisan-verify');
    } else {
      setStep('interests');
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const saveAndRedirect = async (r: string, interests: string[]) => {
    if (!user) return;
    setLoading(true);
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      role: r,
      interests,
      createdAt: new Date().toISOString(),
      onboarded: true
    }, { merge: true });
    setLoading(false);
  };

  const handleFinish = async () => {
    await saveAndRedirect('explorer', selectedInterests);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center px-6">
      {step === 'role' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full space-y-12 text-center"
        >
          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
              How would you like to <span className="text-orange-500 italic">use</span> the platform?
            </h1>
            <p className="text-slate-500 dark:text-white/40 font-medium">Choose your path to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button
              onClick={() => handleRoleSelect('explorer')}
              className="group p-10 bg-white dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 rounded-[40px] text-left space-y-4 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/10 transition-all"
            >
              <div className="text-5xl">🗺️</div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Explore & Learn</h3>
              <p className="text-slate-500 dark:text-white/40 font-medium">Discover Indian heritage, book mentors, and explore cultural content</p>
            </button>

            <button
              onClick={() => handleRoleSelect('artisan')}
              className="group p-10 bg-white dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 rounded-[40px] text-left space-y-4 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all"
            >
              <div className="text-5xl">🎨</div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Become an Artisan / Mentor</h3>
              <p className="text-slate-500 dark:text-white/40 font-medium">Share your craft, teach students, and sell your creations</p>
            </button>
          </div>
        </motion.div>
      )}

      {step === 'interests' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full space-y-12 text-center"
        >
          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
              What are your <span className="text-orange-500 italic">interests?</span>
            </h1>
            <p className="text-slate-500 dark:text-white/40 font-medium">Select all that apply — we'll personalize your experience</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {INTERESTS.map(interest => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all ${
                  selectedInterests.includes(interest)
                    ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20 scale-105'
                    : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/40 hover:border-orange-500'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>

          <button
            onClick={handleFinish}
            disabled={selectedInterests.length === 0 || loading}
            className="px-16 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
          >
            {loading ? 'Saving...' : 'Start Exploring →'}
          </button>
        </motion.div>
      )}
    </div>
  );
}
