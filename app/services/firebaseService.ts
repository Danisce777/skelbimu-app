import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from '../../FirebaseConfig';
import { Ad } from '../context/AdsContext';

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const createAd = async(ad: Omit<Ad, 'id' | "creatorId">) => {

  try {
      const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be logged in to create an ad.");
    }

    const imageUrls = await uploadImages(ad.image);


    const docRef = await addDoc(collection(db, 'ads'),{
        title: ad.title,
        description: ad.description,
        price: ad.price,
        image: imageUrls,
        contacts: ad.contacts,
        category: ad.category,

        // skelbimas bus priskirtas current useriui
        creatorId: user.uid,
        createdAt: new Date().toISOString()
    });
    console.log('Successfully added with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error creating ad:', error);
    throw error;
  }
} 

export const getAllAds = async (): Promise<Ad[]> => {

  try {
    const querySnapshot = await getDocs(collection(db, 'ads'));
    const ads: Ad[] = [];
    
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data());

      ads.push({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        price: doc.data().price,
        image: doc.data().image,
        contacts: doc.data().contacts,
        category: doc.data().category,
        creatorId: doc.data().creatorId
        })
      })
      
    return ads

  } catch (error) {
    console.error('Error fetching ads:', error);
    throw error;
  }
}

export const updateAd = async (adId: string, updates: Partial<Ad>) => {


  try {
    const adRef = doc(db, 'ads', adId);

    if (updates.image) {
      const imageUrls = await uploadImages(updates.image);
      updates.image = imageUrls;
    }

    await updateDoc(adRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating ad:', error);
    throw error;
  }
};

export const deleteAd = async (adId: string) => {
  try {
    await deleteDoc(doc(db, 'ads', adId));

  } catch(error) {
    console.error('Error updating ad:', error);
    throw error;  
  }
};


export const uploadImages = async (imageUris: string[]): Promise<string[]> => {

  const uploadedUrls: string[] = [];

  for(const uri of imageUris) {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const filename = `ads/${Date.now()}_${Math.random().toString(36).substring(7)}`
      const storageRef = ref(storage, filename);

      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);
      uploadedUrls.push(downloadUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
    return uploadedUrls;
}