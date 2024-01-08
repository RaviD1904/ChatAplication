import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";    
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDa-f5MBuH9v-98NsscNWCN2_utTp1xtWI",
  authDomain: "chatapp-f0c5d.firebaseapp.com",
  projectId: "chatapp-f0c5d",
  storageBucket: "chatapp-f0c5d.appspot.com",
  messagingSenderId: "980914387702",
  appId: "1:980914387702:web:dfb3484299ff3420748ad7",
  measurementId: "G-1SHPSDQ3KP"
};

export const app = initializeApp(firebaseConfig);
export const auth= getAuth();
export const storage = getStorage();
export const db=getFirestore()