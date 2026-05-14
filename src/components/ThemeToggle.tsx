import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useUser();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative p-2 rounded-full bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 transition-colors border border-slate-300 dark:border-white/10"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 text-indigo-400" />
        ) : (
          <Sun className="w-5 h-5 text-orange-500" />
        )}
      </motion.div>
    </motion.button>
  );
}
