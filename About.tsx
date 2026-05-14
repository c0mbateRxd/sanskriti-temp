import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShieldCheck, Globe, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h1 className="text-7xl font-bold tracking-tighter leading-[0.9] serif">
              Preserving our <span className="text-saffron italic">Soul</span>, <br />
              Bridging the <span className="text-india-green">Divide</span>.
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Sanskriti AI was born from a simple realization: India's greatest wealth is its diverse cultural heritage, yet much of it remains hidden or endangered in the digital age.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-saffron">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">Endangered Traditions</h4>
                  <p className="text-sm text-white/40">Protecting oral histories and dying art forms.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-india-green">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">Digital Visibility</h4>
                  <p className="text-sm text-white/40">Making local masters accessible globally.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square glass rounded-3xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-saffron/20 to-india-green/20" />
              <img 
                src="https://images.unsplash.com/photo-1514222139-b576bb5ce003?q=80&w=800&auto=format&fit=crop" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60"
                alt="Culture"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-4 border-white/20 rounded-full chakra-decoration" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vision Grid */}
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="glass-card p-8 space-y-4">
            <ShieldCheck className="w-10 h-10 text-saffron" />
            <h3 className="text-xl font-bold">Authenticity</h3>
            <p className="text-white/60">We prioritize verified narratives and authentic artisan representations over generic content.</p>
          </div>
          <div className="glass-card p-8 space-y-4">
            <Users className="w-10 h-10 text-white" />
            <h3 className="text-xl font-bold">Community</h3>
            <p className="text-white/60">Crowdsourced wisdom filtered through cultural experts ensures a living, breathing digital archive.</p>
          </div>
          <div className="glass-card p-8 space-y-4">
            <Globe className="w-10 h-10 text-india-green" />
            <h3 className="text-xl font-bold">Inclusivity</h3>
            <p className="text-white/60">Representing all 28 states and 8 union territories, specialized focus on lesser-known regions.</p>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="glass-card p-12 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-india-green/10 blur-[100px]" />
          <h2 className="text-4xl font-bold relative z-10">Become a Cultural Steward</h2>
          <p className="text-white/60 max-w-xl mx-auto relative z-10">
            Join thousands of users in building the world's most comprehensive digital museum of Indian heritage.
          </p>
          <button className="px-10 py-4 bg-white text-navy-blue font-black rounded-2xl relative z-10 hover:scale-105 transition-transform tracking-widest">
            JOIN THE MISSION
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
