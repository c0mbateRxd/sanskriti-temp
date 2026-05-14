import { collection, doc, setDoc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/config';
import { ARTISTS_DATA } from '../data/artists';

export const seedMentors = async () => {
  try {
    const artistsCollection = collection(db, 'artists');
    const snapshot = await getDocs(artistsCollection);
    
    // Only seed if empty or explicitly requested (we check for count < 5 as a safety)
    if (snapshot.size < 40) {
      console.log('Seeding mentors to Firestore...');
      const batch = writeBatch(db);
      
      ARTISTS_DATA.forEach((artist) => {
        const artistRef = doc(artistsCollection, artist.id);
        batch.set(artistRef, {
          ...artist,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      });
      
      await batch.commit();
      console.log('Successfully seeded 40+ mentors to Firestore');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error seeding mentors:', error);
    throw error;
  }
};
