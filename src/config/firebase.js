import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCzwpPQQoZiW2S48vztrRjs9LoE_5q7aMI",
  authDomain: "carritocompras-94a51.firebaseapp.com",
  projectId: "carritocompras-94a51",
  storageBucket: "carritocompras-94a51.appspot.com",
  messagingSenderId: "805008028028",
  appId: "1:805008028028:web:72e8816d4d00820edaf4f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app); // variable que hace referencia al firestore