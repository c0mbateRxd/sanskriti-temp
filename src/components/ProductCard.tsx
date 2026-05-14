import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Star, MapPin } from 'lucide-react';
import { Product } from '../data/products';
import { useUser } from '../context/UserContext';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { wishlist, toggleWishlist, addToCart, localReviews } = useUser();
  const isWishlisted = wishlist.includes(product.id);
  const totalReviews = (product.reviewsList?.length || 0) + (localReviews[product.id]?.length || 0);

  return (
    <motion.div
      layout
      whileHover={{ y: -8 }}
      className="group relative bg-white dark:bg-white/5 backdrop-blur-md rounded-[32px] overflow-hidden border border-slate-200 dark:border-white/10 flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden" onClick={() => onClick(product)}>
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border border-white/20 transition-all ${
            isWishlisted ? 'bg-rose-500 text-white border-rose-400' : 'bg-black/20 text-white hover:bg-black/40'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Category Tag */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest text-white border border-white/20">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-1.5 text-orange-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[10px] font-black">{product.rating}</span>
            <span className="text-[10px] text-slate-400 dark:text-white/20 font-bold">({totalReviews || product.reviews})</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-indigo-500">
            ₹{product.price.toLocaleString()}
          </span>
        </div>

        <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-indigo-500 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest mb-4">
          By {product.artisan}
        </p>

        <div className="flex items-center gap-2 mb-6 text-slate-500 dark:text-white/40">
          <MapPin className="w-3 h-3" />
          <span className="text-[10px] uppercase font-bold tracking-widest">{product.state}</span>
        </div>

        <div className="mt-auto flex gap-2">
          <button
            onClick={() => onClick(product)}
            className="flex-1 px-4 py-3 bg-slate-100 dark:bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
          >
            Details
          </button>
          <button
            onClick={() => addToCart(product.id)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-500/20 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
