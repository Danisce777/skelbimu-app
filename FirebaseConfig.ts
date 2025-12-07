
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyDUk-29y54esBrvMnL3pEy5-Lk4krQUWBM",
  authDomain: "skelbimai-c5762.firebaseapp.com",
  projectId: "skelbimai-c5762",
  storageBucket: "skelbimai-c5762.firebasestorage.app",
  messagingSenderId: "969513741650",
  appId: "1:969513741650:web:bbd999fdbff15318c51e8b",
  measurementId: "G-NHJS0WE450"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

