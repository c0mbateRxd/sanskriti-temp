import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

const QUESTIONS = [
  {
    question: "Which classical dance form originated in Tamil Nadu?",
    options: ["Kathak", "Bharatanatyam", "Odissi", "Manipuri"],
    answer: "Bharatanatyam",
    fact: "Bharatanatyam is one of the oldest classical dance forms, originating in the temples of Tamil Nadu."
  },
  {
    question: "Madhubani painting is a traditional art form from which state?",
    options: ["Rajasthan", "Gujarat", "Bihar", "West Bengal"],
    answer: "Bihar",
    fact: "Madhubani painting originated in the Mithila region of Bihar, using natural dyes and pigments."
  },
  {
    question: "Which festival is celebrated as the harvest festival of Kerala?",
    options: ["Pongal", "Onam", "Baisakhi", "Bihu"],
    answer: "Onam",
    fact: "Onam is Kerala's most important festival, celebrating the return of King Mahabali."
  },
  {
    question: "Pashmina shawls are traditionally made in which region?",
    options: ["Punjab", "Himachal Pradesh", "Jammu & Kashmir", "Uttarakhand"],
    answer: "Jammu & Kashmir",
    fact: "Pashmina is made from the fine wool of the Changthangi goat found in the Ladakh region."
  },
  {
    question: "Which dance form is associated with Rajasthan?",
    options: ["Ghoomar", "Bihu", "Lavani", "Garba"],
    answer: "Ghoomar",
    fact: "Ghoomar is a traditional folk dance of Rajasthan, performed by women in swirling ghagras."
  },
  {
    question: "Kuchipudi is a classical dance from which state?",
    options: ["Karnataka", "Tamil Nadu", "Andhra Pradesh", "Telangana"],
    answer: "Andhra Pradesh",
    fact: "Kuchipudi originated in the village of Kuchipudi in Andhra Pradesh over 2000 years ago."
  },
  {
    question: "Which is the famous textile of West Bengal?",
    options: ["Phulkari", "Kantha Stitch", "Chikankari", "Bandhani"],
    answer: "Kantha Stitch",
    fact: "Kantha is a form of embroidery craft, practiced in West Bengal using old saris and cloth."
  },
  {
    question: "Warli painting is a tribal art from which state?",
    options: ["Odisha", "Madhya Pradesh", "Maharashtra", "Jharkhand"],
    answer: "Maharashtra",
    fact: "Warli art is practiced by the Warli tribe of Maharashtra, using geometric shapes."
  }
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showFact, setShowFact] = useState(false);

  const question = QUESTIONS[current];

  const handleAnswer = (option: string) => {
    if (selected) return;
    setSelected(option);
    setShowFact(true);
    if (option === question.answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowFact(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShowFact(false);
  };

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full text-center space-y-8 p-12 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px]"
        >
          <div className="text-7xl">
            {score >= 7 ? '🏆' : score >= 5 ? '🌟' : score >= 3 ? '👍' : '📚'}
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
              Quiz Complete!
            </h2>
            <p className="text-6xl font-black text-orange-500">{score}/{QUESTIONS.length}</p>
            <p className="text-slate-500 dark:text-white/40 font-medium">
              {score >= 7 ? 'Outstanding! You are a true Bharat Guru!' : 
               score >= 5 ? 'Great job! You know Indian culture well!' :
               score >= 3 ? 'Good effort! Keep exploring Sanskriti AI!' :
               'Keep learning! India has so much to discover!'}
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="flex items-center gap-3 mx-auto px-10 py-4 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 pb-20 px-6 max-w-3xl mx-auto space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 bg-orange-500 rounded-full" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Cultural Intelligence Test</p>
        </div>
        <h1 className="text-6xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
          Bharat <span className="text-orange-500 italic">Quiz</span>
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-slate-500 dark:text-white/40 font-medium">
            Question {current + 1} of {QUESTIONS.length}
          </p>
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 rounded-full">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-black text-orange-500">Score: {score}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"
          />
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="space-y-8"
        >
          <div className="p-10 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] space-y-4">
            <div className="text-4xl">🇮🇳</div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {question.question}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {question.options.map((option) => {
              let style = 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-orange-500';
              if (selected) {
                if (option === question.answer) style = 'bg-emerald-500 border-emerald-500 text-white';
                else if (option === selected) style = 'bg-rose-500 border-rose-500 text-white';
                else style = 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 opacity-50';
              }
              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`p-6 rounded-2xl border-2 font-black uppercase tracking-tight text-left transition-all ${style} ${!selected ? 'hover:scale-[1.02]' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selected && option === question.answer && <CheckCircle2 className="w-5 h-5" />}
                    {selected && option === selected && option !== question.answer && <XCircle className="w-5 h-5" />}
                  </div>
                </button>
              );
            })}
          </div>

          {showFact && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl space-y-2"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500">💡 Did You Know?</p>
              <p className="text-sm font-medium text-slate-600 dark:text-white/60">{question.fact}</p>
            </motion.div>
          )}

          {selected && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNext}
              className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all"
            >
              {current + 1 >= QUESTIONS.length ? 'See Results →' : 'Next Question →'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
