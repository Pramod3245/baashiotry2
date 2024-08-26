import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDEw2SOTawUAYaX4nM9cfgbjhjeahaz058",
  authDomain: "blaashiotest.firebaseapp.com",
  databaseURL: "https://blaashiotest-default-rtdb.firebaseio.com",
  projectId: "blaashiotest",
  storageBucket: "blaashiotest.appspot.com",
  messagingSenderId: "708146747410",
  appId: "1:708146747410:web:27a0f8c7a6d16d6d1ce0cb"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
