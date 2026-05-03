// src/lib/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcrwuQW6Dex3myrigpKAIUAONvr2LeGPU",
  authDomain: "auth-app-403c9.firebaseapp.com",
  projectId: "auth-app-403c9",
  storageBucket: "auth-app-403c9.firebasestorage.app",
  messagingSenderId: "319130695344",
  appId: "1:319130695344:web:fe6cfc9c3709bff4732d75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
