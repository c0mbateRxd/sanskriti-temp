import { doc, setDoc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from './config';

export interface CartItem {
  id: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

export const getCart = async (userId: string) => {
  const cartDoc = await getDoc(doc(db, 'carts', userId));
  if (cartDoc.exists()) return cartDoc.data();
  return { userId, items: [], totalPrice: 0 };
};

export const saveCart = async (userId: string, items: CartItem[]) => {
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  await setDoc(doc(db, 'carts', userId), {
    userId,
    items,
    totalPrice,
    updatedAt: Timestamp.now()
  }, { merge: true });
};

export const clearCart = async (userId: string) => {
  await setDoc(doc(db, 'carts', userId), {
    userId,
    items: [],
    totalPrice: 0,
    updatedAt: Timestamp.now()
  });
};
