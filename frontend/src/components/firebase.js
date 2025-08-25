import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDaJO9aj0U7QnMH9Svp88JPFUJlIV2STCA",
  authDomain: "loginpage-a47fc.firebaseapp.com",
  projectId: "loginpage-a47fc",
  storageBucket: "loginpage-a47fc.firebasestorage.app",
  messagingSenderId: "393211817094",
  appId: "1:393211817094:web:cbf0ee70aec5572a9b7507"
};


const app = initializeApp(firebaseConfig);

export const auth= getAuth();
export const db=getFirestore(app);

export default app;

