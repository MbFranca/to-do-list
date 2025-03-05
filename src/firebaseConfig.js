import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Adiciona a importação do Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAXBJJWrXU6QrrW7UMOQVjvBjH9pkzdyYc",
  authDomain: "organizeai-3a55f.firebaseapp.com",
  projectId: "organizeai-3a55f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicialize o Auth e o Firestore
const auth = getAuth(app);
const db = getFirestore(app); // Inicialize o Firestore

export { auth, db }; // Exporta o Firestore também
