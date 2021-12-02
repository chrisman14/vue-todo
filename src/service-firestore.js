// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQh35Kkfabpn6hq4JElwyN5JVFvcndL1I",
  authDomain: "vue-realtime-892eb.firebaseapp.com",
  projectId: "vue-realtime-892eb",
  storageBucket: "vue-realtime-892eb.appspot.com",
  messagingSenderId: "2954124015",
  appId: "1:2954124015:web:76b42d4f7162e3bbfed91a",
  measurementId: "G-7Q1VL8TG13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;