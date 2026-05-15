import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Menu, X, Compass, Home, User, Award, ShoppingBag, GraduationCap, LayoutDashboard, LogIn, MessageSquare, Play, Book, Video } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const { t } = useLanguage();
  const { user, profile, login, logout } = useUser();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/discover', label: 'Explore', icon: Compass },
    { path: '/marketplace', label: 'Market', icon: ShoppingBag },
    { path: '/mentors', label: 'Mentors', icon: GraduationCap },
    { path: '/folklore', label: 'Universe', icon: Book },
    { path: '/community', label: 'Nexus', icon: MessageSquare },
    { path: '/library', label: 'Vault', icon: Play },
    { path: '/roadmap', label: 'Roadmap', icon: MapPin },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 py-3' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-orange-500 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500" />
            <Sparkles className="w-8 h-8 text-orange-500 relative" />
          </div>
          <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-600">
            Sanskriti
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-2 bg-slate-200/50 dark:bg-white/5 p-1 rounded-full border border-slate-300 dark:border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-bg"
                    className="absolute inset-0 bg-orange-500 rounded-full -z-10 shadow-lg shadow-orange-500/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="flex items-center gap-2">
                  <link.icon className="w-3 h-3" />
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-slate-200 dark:bg-white/10" />

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/creator-dashboard"
                  className="hidden lg:flex items-center gap-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500 transition-all text-indigo-600 hover:text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/20"
                >
                  <Video className="w-3 h-3" />
                  Studio
                </Link>
                <Link to="/dashboard" className="flex items-center gap-2 p-1 bg-slate-200/50 dark:bg-white/5 rounded-full border border-slate-300 dark:border-white/10 group pr-3">
                  <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40">Vault</span>
                </Link>
              </div>
            ) : (
              <button 
                onClick={() => login()}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                Auth
              </button>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 rounded-full bg-slate-200 dark:bg-white/5 text-slate-900 dark:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 p-6 bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-white/10 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] ${
                    location.pathname === link.path ? 'text-orange-500' : 'text-slate-500 dark:text-white/40'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-slate-200 dark:bg-white/10" />
              <div className="flex items-center justify-between">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
