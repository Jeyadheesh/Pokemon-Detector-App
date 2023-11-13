// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuPZr96gbH0m_yvAH5vkpcxWIuZqaaVQA",
  authDomain: "pokemondetectorapp.firebaseapp.com",
  projectId: "pokemondetectorapp",
  storageBucket: "pokemondetectorapp.appspot.com",
  messagingSenderId: "273070574682",
  appId: "1:273070574682:web:5db14d869151eaed341c63",
  measurementId: "G-F59JNG6Q5E",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = isSupported().then((yes) =>
  yes ? getAnalytics(app) : null
);
export const storage = getStorage(app);
