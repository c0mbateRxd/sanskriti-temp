import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Send, User, Calendar } from 'lucide-react';
import { Product, Review } from '../data/products';
import { useUser } from '../context/UserContext';

interface ReviewSectionProps {
  product: Product;
}

export default function ReviewSection({ product }: ReviewSectionProps) {
  const { localReviews, addReview } = useUser();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialReviews = product.reviewsList || [];
  const addedReviews = localReviews[product.id] || [];
  const allReviews = [...addedReviews, ...initialReviews];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    // Simulate delay
    setTimeout(() => {
      addReview(product.id, {
        userName: 'You',
        rating,
        comment: comment.trim()
      });
      setComment('');
      setRating(5);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-2">
           <h3 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
             Customer <span className="text-indigo-500">Reviews</span>
           </h3>
           <p className="text-sm font-medium text-slate-500 dark:text-white/40 italic">
             Real feedback from art lovers across India
           </p>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-white/5 p-4 rounded-3xl border border-slate-100 dark:border-white/10">
          <div className="flex flex-col items-center border-r border-slate-200 dark:border-white/10 pr-6">
            <span className="text-3xl font-black text-slate-900 dark:text-white leading-none">{product.rating}</span>
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20">Overall</span>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-0.5 text-orange-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="text-[10px] font-black text-slate-500 dark:text-white/40 uppercase tracking-widest">{allReviews.length} Reviews</span>
          </div>
        </div>
      </div>

      {/* Review Form */}
      <motion.form 
        onSubmit={handleSubmit}
        className="p-8 rounded-[40px] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20">Leave Your Review</p>
           <div className="flex items-center gap-3">
             <span className="text-xs font-black text-slate-500 dark:text-white/40 uppercase tracking-widest">Your Rating:</span>
             <div className="flex gap-1">
               {[1, 2, 3, 4, 5].map((star) => (
                 <button
                   key={star}
                   type="button"
                   onClick={() => setRating(star)}
                   className={`transition-all hover:scale-125 ${star <= rating ? 'text-orange-500' : 'text-slate-300 dark:text-white/10'}`}
                 >
                   <Star className={`w-5 h-5 ${star <= rating ? 'fill-current' : ''}`} />
                 </button>
               ))}
             </div>
           </div>
        </div>

        <div className="relative group">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about the craftsmanship, style, or delivery..."
            className="w-full h-32 p-6 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/10 rounded-3xl outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors text-slate-700 dark:text-white font-medium resize-none shadow-sm"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all"
          >
            {isSubmitting ? 'Posting...' : 'Post Review'}
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.form>

      {/* Existing Reviews */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout text-blue-100">
          {allReviews.map((rev, i) => (
            <motion.div
              layout
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-8 rounded-[32px] bg-white dark:bg-transparent border border-slate-100 dark:border-white/5 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white">{rev.userName}</h4>
                    <div className="flex items-center gap-3">
                       <div className="flex gap-0.5 text-orange-500">
                         {[...Array(5)].map((_, j) => (
                           <Star key={j} className={`w-2.5 h-2.5 ${j < rev.rating ? 'fill-current' : 'text-slate-200 dark:text-white/10'}`} />
                         ))}
                       </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 dark:text-white/20">
                  <Calendar className="w-3 h-3" />
                  <span className="text-[10px] font-bold tracking-widest">{rev.date}</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed font-medium pl-14">
                {rev.comment}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
