import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy7CET0OEiJIxmsy8ngWl-vT4N2weiZyg",
  authDomain: "netflixai-ace36.firebaseapp.com",
  projectId: "netflixai-ace36",
  storageBucket: "netflixai-ace36.appspot.com",
  messagingSenderId: "387961448490",
  appId: "1:387961448490:web:3fce924b87708a05663b53",
  measurementId: "G-5STJSEP5E4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);