import React from 'react';
import { motion } from 'motion/react';
import { Flame, Star } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/products';

export default function TrendingCrafts() {
  const trending = PRODUCTS_DATA.filter(p => p.trending);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 px-2">
        <div className="p-2 bg-orange-500/10 rounded-xl">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
        </div>
        <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">
          Trending Crafts
        </h2>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide">
        {trending.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex-shrink-0 w-80 group relative h-96 rounded-[32px] overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl"
          >
            <img src={product.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute top-6 left-6 flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase text-white tracking-widest border border-white/20">
              <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
              Top Rated
            </div>

            <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
               <div className="space-y-1 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest leading-none">By {product.artisan}</p>
                 <h4 className="text-xl font-black text-white tracking-tighter">{product.name}</h4>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-2xl font-black text-white tracking-tighter italic">₹{product.price.toLocaleString()}</span>
                 <button className="p-3 bg-white text-slate-900 rounded-2xl shadow-xl hover:scale-110 transition-all">
                   <Flame className="w-4 h-4" />
                 </button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
