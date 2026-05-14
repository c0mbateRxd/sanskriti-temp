import { StateCategory } from './states';

export type CraftCategory = 'Textile' | 'Wooden Art' | 'Painting' | 'Folk Art' | 'Clothing' | 'Pottery' | 'Handicraft' | 'Textile Art' | 'Tribal Art';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  artisan: string;
  state: string;
  price: number;
  category: CraftCategory;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  trending?: boolean;
  reviewsList?: Review[];
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'p1',
    name: 'Mysore Silk Saree',
    artisan: 'Lakshmi Weavers',
    state: 'Karnataka',
    price: 8500,
    category: 'Textile',
    description: 'Exquisite Mysore Silk Saree known for its pure silk and gold zari work, a treasure of Karnataka.',
    image: 'https://images.unsplash.com/photo-1610030469668-963d41e72152?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 124,
    trending: true,
    reviewsList: [
      { id: 'r1', userName: 'Anjali Sharma', rating: 5, comment: 'Authentic and beautiful silk!', date: '2024-03-12' },
      { id: 'r2', userName: 'Vikram Singh', rating: 4, comment: 'Good quality, but shipping took time.', date: '2024-02-15' }
    ]
  },
  {
    id: 'p2',
    name: 'Channapatna Wooden Toys',
    artisan: 'Ramesh Crafts',
    state: 'Karnataka',
    price: 1200,
    category: 'Wooden Art',
    description: 'Eco-friendly wooden toys colored with vegetable dyes, traditional to Channapatna.',
    image: 'https://images.unsplash.com/photo-1532330393533-443990a51d10?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 89,
    reviewsList: [
      { id: 'r3', userName: 'Nisha K.', rating: 5, comment: 'My kids love these toys. Very safe.', date: '2024-04-01' }
    ]
  },
  {
    id: 'p3',
    name: 'Tanjore Painting',
    artisan: 'Priya Arts Studio',
    state: 'Tamil Nadu',
    price: 6000,
    category: 'Painting',
    description: 'Classical South Indian painting style with rich colors and gold leaf embellishments.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviews: 45,
    trending: true
  },
  {
    id: 'p4',
    name: 'Madhubani Painting',
    artisan: 'Sita Devi Arts',
    state: 'Bihar',
    price: 3500,
    category: 'Folk Art',
    description: 'Traditional Mithila art characterized by complex geometrical patterns.',
    image: 'https://images.unsplash.com/photo-1541013359679-560642398539?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 67
  },
  {
    id: 'p5',
    name: 'Pashmina Shawl',
    artisan: 'Kashmiri Threads',
    state: 'Jammu & Kashmir',
    price: 9000,
    category: 'Clothing',
    description: 'Super fine cashmere wool shawls, hand-spun and hand-woven in Kashmir.',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 156,
    trending: true
  },
  {
    id: 'p6',
    name: 'Blue Pottery Vase',
    artisan: 'Jaipur Clay Works',
    state: 'Rajasthan',
    price: 2200,
    category: 'Pottery',
    description: 'Exquisite blue pottery from Jaipur, made from a special mix including quartz and multani mitti.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 78
  },
  {
    id: 'p7',
    name: 'Bamboo Handicraft Basket',
    artisan: 'NorthEast Bamboo Hub',
    state: 'Assam',
    price: 950,
    category: 'Handicraft',
    description: 'Sustainable bamboo basketry handcrafted by skilled artisans of Assam.',
    image: 'https://images.unsplash.com/photo-1590050752117-23a9d7fc2113?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviews: 34
  },
  {
    id: 'p8',
    name: 'Kalamkari Wall Art',
    artisan: 'Andhra Heritage Crafts',
    state: 'Andhra Pradesh',
    price: 4000,
    category: 'Textile Art',
    description: 'Hand-painted or block-printed cotton textile, produced using natural dyes.',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 52
  },
  {
    id: 'p9',
    name: 'Warli Tribal Painting',
    artisan: 'Maharashtra Folk Studio',
    state: 'Maharashtra',
    price: 2800,
    category: 'Tribal Art',
    description: 'Ancient tribal art from Maharashtra, using simple geometric shapes like circle, triangle, and square.',
    image: 'https://images.unsplash.com/photo-1563200150-10904128f704?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 41
  },
  {
    id: 'p10',
    name: 'Banarasi Silk Dupatta',
    artisan: 'Varanasi Looms',
    state: 'Uttar Pradesh',
    price: 5500,
    category: 'Textile',
    description: 'Elegant silk dupatta with intricate gold and silver zari work.',
    image: 'https://images.unsplash.com/photo-1610030469915-9a4f66761747?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 93
  }
];
