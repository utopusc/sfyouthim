"use client";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, PhoneAuthProvider, OAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDXyyhCpC36xYCEraU29k8mei2gAdvBsdg",
  authDomain: "sfyouthim.firebaseapp.com",
  projectId: "sfyouthim",
  storageBucket: "sfyouthim.firebasestorage.app",
  messagingSenderId: "632517968568",
  appId: "1:632517968568:web:5a31fcb4d2582abd866a4d",
  measurementId: "G-E0DECXCX6Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Avoid SSR issues
isSupported().then(async (supported) => {
  if (supported) {
    const analyticsModule = await import("firebase/analytics");
    analyticsModule.getAnalytics(app);
  }
});

// Export providers for usage in sign-in
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const phoneProvider = new PhoneAuthProvider(auth);