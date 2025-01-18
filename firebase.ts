import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

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
export const analytics = getAnalytics(app);