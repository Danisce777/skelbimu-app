// Import the functions you need from the SDKs you need
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUk-29y54esBrvMnL3pEy5-Lk4krQUWBM",
  authDomain: "skelbimai-c5762.firebaseapp.com",
  projectId: "skelbimai-c5762",
  storageBucket: "skelbimai-c5762.firebasestorage.app",
  messagingSenderId: "969513741650",
  appId: "1:969513741650:web:bbd999fdbff15318c51e8b",
  measurementId: "G-NHJS0WE450"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


// export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });