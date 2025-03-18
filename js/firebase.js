// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBAVyFkAT82V9cVlHngwaVuIUmwispMu9E",
  authDomain: "jewelry-7edac.firebaseapp.com",
  projectId: "jewelry-7edac",
  storageBucket: "jewelry-7edac.firebasestorage.app",
  messagingSenderId: "354346255496",
  appId: "1:354346255496:web:78af7771b11188e1a6cb3d"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
