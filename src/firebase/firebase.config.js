// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLynSdEGIy2TFk3Y9e7K-2FxiPPHixOHc",
  authDomain: "job-portal-bb2fa.firebaseapp.com",
  projectId: "job-portal-bb2fa",
  storageBucket: "job-portal-bb2fa.firebasestorage.app",
  messagingSenderId: "226795118738",
  appId: "1:226795118738:web:b64dd2fb145c2df6c0464b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);