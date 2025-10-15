import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = { 
  apiKey: "AIzaSyAooFvH9d19W2jcNOAmZv7GabHCdr_O3RE", 
  authDomain: "abhay-67783.firebaseapp.com", 
  databaseURL: "https://abhay-67783-default-rtdb.firebaseio.com", 
  projectId: "abhay-67783", 
  storageBucket: "abhay-67783.firebasestorage.app", 
  messagingSenderId: "880880220147", 
  appId: "1:880880220147:web:fe02b389e8d28463a28486", 
  measurementId: "G-2R4RJ2976X" 
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// This enables persistence. It's an async function, but we don't need to `await` it here.
// Firebase SDK will handle the promise internally and queue operations.
setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error("Firebase Persistence Error:", error);
});

export { app, auth, db, storage };
