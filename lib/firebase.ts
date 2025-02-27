import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBNfqLbufk7LbPcUA5nr29_r5raNOJcjn4",
  authDomain: "studentwaitinglist.firebaseapp.com",
  projectId: "studentwaitinglist",
  storageBucket: "studentwaitinglist.firebasestorage.app",
  messagingSenderId: "170081834248",
  appId: "1:170081834248:web:e1a4f2d2e03e33800008bd",
  measurementId: "G-4J4DZ28KXR"
};

console.log("Initializing Firebase with config:", { ...firebaseConfig, apiKey: '[HIDDEN]' });

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

// Only initialize analytics on the client side
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

console.log("Firebase initialized successfully");

export { db }; 