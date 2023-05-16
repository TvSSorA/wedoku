import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyAUqY5UKxho8fC9QNI70YlhpQSoe_r2-2c",
    authDomain: "wedoku-d3500.firebaseapp.com",
    databaseURL: "https://wedoku-d3500-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wedoku-d3500",
    storageBucket: "wedoku-d3500.appspot.com",
    messagingSenderId: "381287339740",
    appId: "1:381287339740:web:37d81f7ff25213cd044619",
    measurementId: "G-MMBM958V09"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
