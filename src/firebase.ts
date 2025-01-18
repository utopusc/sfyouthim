"use client";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
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

// Initialize Firebase only if it hasn't been initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

// Analytics setup with SSR check
if (typeof window !== "undefined") {
  isSupported().then(async (supported) => {
    if (supported) {
      const analyticsModule = await import("firebase/analytics");
      analyticsModule.getAnalytics(app);
    }
  });
}

export { auth, app };
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");