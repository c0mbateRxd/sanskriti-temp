import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { Review } from '../data/products';

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  wishlist: string[];
  cart: { id: string; quantity: number }[];
  exploredStates: string[];
  enrolledClasses: string[];
  achievements: string[];
}

interface UserContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  exploredStates: string[];
  toggleExplored: (stateId: string) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  cart: { id: string; quantity: number }[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  localReviews: Record<string, Review[]>;
  addReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
  streak: number;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  isStateExplored: (stateId: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [exploredStates, setExploredStates] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);

  const [localReviews, setLocalReviews] = useState<Record<string, Review[]>>(() => {
    const saved = localStorage.getItem('sanskriti-reviews');
    return saved ? JSON.parse(saved) : {};
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('sanskriti-streak');
    const lastVisit = localStorage.getItem('sanskriti-last-visit');
    const today = new Date().toDateString();
    
    if (lastVisit === today) return Number(saved) || 0;
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastVisit === yesterday.toDateString()) {
      return (Number(saved) || 0) + 1;
    }
    
    return 1;
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('sanskriti-theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('sanskriti-streak', streak.toString());
    localStorage.setItem('sanskriti-last-visit', new Date().toDateString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('sanskriti-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const userDoc = doc(db, 'users', u.uid);
        const snapshot = await getDoc(userDoc);
        
        if (!snapshot.exists()) {
          const newProfile: UserProfile = {
            uid: u.uid,
            email: u.email,
            displayName: u.displayName,
            photoURL: u.photoURL,
            wishlist: [],
            cart: [],
            exploredStates: [],
            enrolledClasses: [],
            achievements: []
          };
          await setDoc(userDoc, newProfile);
          setProfile(newProfile);
        } else {
          setProfile(snapshot.data() as UserProfile);
        }

        onSnapshot(userDoc, (doc) => {
          if (doc.exists()) {
            const data = doc.data() as UserProfile;
            setProfile(data);
            setWishlist(data.wishlist || []);
            setCart(data.cart || []);
            setExploredStates(data.exploredStates || []);
          }
        });
      } else {
        setProfile(null);
        const savedExp = localStorage.getItem('sanskriti-explored');
        const savedWish = localStorage.getItem('sanskriti-wishlist');
        const savedCart = localStorage.getItem('sanskriti-cart');
        setExploredStates(savedExp ? JSON.parse(savedExp) : []);
        setWishlist(savedWish ? JSON.parse(savedWish) : []);
        setCart(savedCart ? JSON.parse(savedCart) : []);
      }
      setLoading(false);
    });
  }, []);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('Login popup closed by user');
        return;
      }
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    if (!user) {
      localStorage.setItem('sanskriti-explored', JSON.stringify(exploredStates));
      localStorage.setItem('sanskriti-wishlist', JSON.stringify(wishlist));
      localStorage.setItem('sanskriti-cart', JSON.stringify(cart));
    }
  }, [exploredStates, wishlist, cart, user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (user) {
      await setDoc(doc(db, 'users', user.uid), updates, { merge: true });
    }
  };

  const toggleExplored = (stateId: string) => {
    const newExplored = exploredStates.includes(stateId) ? exploredStates : [...exploredStates, stateId];
    setExploredStates(newExplored);
    if (user) updateProfile({ exploredStates: newExplored });
  };

  const toggleWishlist = (productId: string) => {
    const newWishlist = wishlist.includes(productId) 
      ? wishlist.filter(id => id !== productId) 
      : [...wishlist, productId];
    setWishlist(newWishlist);
    if (user) updateProfile({ wishlist: newWishlist });
  };

  const addToCart = (productId: string) => {
    let newCart = [...cart];
    const existing = newCart.find(item => item.id === productId);
    if (existing) {
      newCart = newCart.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart.push({ id: productId, quantity: 1 });
    }
    setCart(newCart);
    if (user) updateProfile({ cart: newCart });
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    if (user) updateProfile({ cart: newCart });
  };

  const addReview = (productId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `r-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setLocalReviews(prev => ({
      ...prev,
      [productId]: [newReview, ...(prev[productId] || [])]
    }));
  };

  const isStateExplored = (stateId: string) => exploredStates.includes(stateId);

  return (
    <UserContext.Provider value={{ 
      user,
      profile,
      loading,
      login,
      logout,
      exploredStates, 
      toggleExplored, 
      wishlist,
      toggleWishlist,
      cart,
      addToCart,
      removeFromCart,
      localReviews,
      addReview,
      streak, 
      theme, 
      setTheme,
      isStateExplored 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
