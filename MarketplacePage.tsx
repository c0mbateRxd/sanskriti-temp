import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Heart, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { PRODUCTS_DATA, Product, CraftCategory } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductDetailsModal from '../components/ProductDetailsModal';
import MarketplaceSearch from '../components/MarketplaceSearch';
import TrendingCrafts from '../components/TrendingCrafts';
import { useUser } from '../context/UserContext';

const CATEGORIES: CraftCategory[] = [
  'Textile', 'Wooden Art', 'Painting', 'Folk Art', 'Clothing', 'Pottery', 'Handicraft', 'Textile Art', 'Tribal Art'
];

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CraftCategory | 'All'>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { wishlist, cart } = useUser();

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.artisan.toLowerCase().includes(search.toLowerCase()) ||
                          p.state.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen pt-12 pb-20 px-6 space-y-24 max-w-[1600px] mx-auto">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="space-y-6 max-w-2xl">
          <div className="flex items-center gap-3">
             <div className="h-1 w-12 bg-indigo-500 rounded-full" />
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Curated Bharat Crafts</p>
          </div>
          <h1 className="text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85] uppercase">
            Craft <br /> <span className="text-zinc-300 dark:text-white/10 italic">Marketplace</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-white/40 font-medium leading-relaxed">
            Support local artisans and bring a piece of Indian heritage home. 100% authentic, handcrafted treasures from across the subcontinent.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white dark:bg-white/5 p-4 rounded-[32px] border border-slate-200 dark:border-white/10 shadow-2xl">
          <div className="flex flex-col items-center px-6 border-r border-slate-100 dark:border-white/5">
             <span className="text-2xl font-black text-indigo-500">{wishlist.length}</span>
             <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20">Wishlist</span>
          </div>
          <div className="flex flex-col items-center px-6">
             <span className="text-2xl font-black text-orange-500">
               {cart.reduce((acc, curr) => acc + curr.quantity, 0)}
             </span>
             <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20">Cart</span>
          </div>
        </div>
      </section>

      {/* Categories Toolbar */}
      <section className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
         <button
            onClick={() => setSelectedCategory('All')}
            className={`flex-shrink-0 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
              selectedCategory === 'All' 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl' 
                : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400'
            }`}
         >
           All Categories
         </button>
         {CATEGORIES.map(cat => (
           <button
             key={cat}
             onClick={() => setSelectedCategory(cat)}
             className={`flex-shrink-0 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
               selectedCategory === cat 
                 ? 'bg-indigo-500 text-white shadow-xl shadow-indigo-500/20' 
                 : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400'
             }`}
           >
             {cat}
           </button>
         ))}
      </section>

      <TrendingCrafts />

      {/* Main Grid */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
           <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-3">
             <Sparkles className="w-5 h-5 text-indigo-500" />
             Discover {filteredProducts.length} Treasures
           </h3>
           <MarketplaceSearch value={search} onChange={setSearch} />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onClick={setSelectedProduct} 
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-40 text-center space-y-6 bg-slate-50 dark:bg-white/2 rounded-[48px] border-4 border-dashed border-slate-200 dark:border-white/5">
            <ShoppingBag className="w-16 h-16 mx-auto text-slate-300 dark:text-white/10 animate-bounce" />
            <div className="space-y-2">
              <p className="text-xl font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.5em]">No crafts match your search</p>
              <button 
                onClick={() => {setSearch(''); setSelectedCategory('All');}}
                className="text-indigo-500 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Benefits */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { icon: Sparkles, title: 'Generative Legacy', desc: 'Every product tells a 5,000 year old story reconstructed for the modern era.' },
           { icon: Heart, title: 'Artist Direct', desc: '80% of revenue goes directly to the village artisans with zero platform fees.' },
           { icon: Filter, title: 'AI Authenticity', desc: 'Each craft is verified by our AI recognition models for regional accuracy.' }
         ].map((item, i) => (
            <div key={i} className="p-12 rounded-[48px] bg-slate-950 dark:bg-white/10 text-white space-y-6">
               <item.icon className="w-8 h-8 text-indigo-400" />
               <div className="space-y-2">
                 <h4 className="text-2xl font-black tracking-tight">{item.title}</h4>
                 <p className="text-white/40 font-medium leading-relaxed">{item.desc}</p>
               </div>
               <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                 Learn More <ChevronRight className="w-3 h-3" />
               </button>
            </div>
         ))}
      </section>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailsModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
