import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, MapPin, ShoppingBag, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';
import { Product } from '../data/products';
import { useUser } from '../context/UserContext';

import ReviewSection from './ReviewSection';

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailsModal({ product, onClose }: ProductDetailsModalProps) {
  const { addToCart, wishlist, toggleWishlist, localReviews } = useUser();
  const isWishlisted = wishlist.includes(product.id);
  const totalReviews = (product.reviewsList?.length || 0) + (localReviews[product.id]?.length || 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/40 dark:bg-black/80 backdrop-blur-md"
      />

      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-5xl h-[80vh] bg-white dark:bg-zinc-950 rounded-[48px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-10 p-3 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-md text-slate-500 dark:text-white/40 hover:text-rose-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left: Image Gallery */}
        <div className="w-full md:w-1/2 h-full relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white dark:to-zinc-950 hidden md:block" />
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-1/2 h-full overflow-y-auto p-12 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-indigo-500 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-orange-500 font-bold bg-orange-500/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">
                <Star className="w-3 h-3 fill-current" />
                {product.rating} &bull; {totalReviews || product.reviews} Reviews
              </div>
            </div>

            <h2 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 text-slate-500 dark:text-white/40">
              <MapPin className="w-4 h-4" />
              <p className="text-xs font-black uppercase tracking-[0.2em]">{product.state}</p>
            </div>
          </div>

          <div className="space-y-2">
             <p className="text-4xl font-black tracking-tighter text-indigo-500">
               ₹{product.price.toLocaleString()}
             </p>
             <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest">
               Inclusive of all taxes & free shipping
             </p>
          </div>

          <p className="text-lg text-slate-600 dark:text-white/60 leading-relaxed font-medium">
            {product.description}
          </p>

          <div className="flex flex-col gap-4 pt-6 border-t border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-4">
               <button
                 onClick={() => addToCart(product.id)}
                 className="flex-1 flex items-center justify-center gap-3 py-5 bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all"
               >
                 <ShoppingBag className="w-5 h-5" />
                 Add to Bag
               </button>
               <button 
                 onClick={() => toggleWishlist(product.id)}
                 className={`p-5 rounded-2xl border transition-all ${
                   isWishlisted 
                     ? 'bg-rose-500 text-white border-rose-400' 
                     : 'border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/20 hover:text-rose-500'
                 }`}
               >
                 <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
               </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4">
             {[
               { icon: ShieldCheck, label: 'Authentic Art' },
               { icon: Truck, label: 'Free Delivery' },
               { icon: RefreshCw, label: '7 Day Return' }
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 opacity-60">
                 <item.icon className="w-4 h-4 text-indigo-500" />
                 <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
               </div>
             ))}
          </div>

          {/* Artisan Profile Preview */}
          <div className="p-8 rounded-[32px] bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/10 space-y-4">
             <div>
               <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Meet the Artisan</p>
               <h4 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">{product.artisan}</h4>
             </div>
             <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">
               Expert in {product.category}, carrying forward generational legacy of Indian craftsmanship.
             </p>
             <button className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] hover:translate-x-2 transition-transform">View Full Profile &rarr;</button>
          </div>

          <div className="pt-10 border-t border-slate-100 dark:border-white/5">
            <ReviewSection product={product} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
