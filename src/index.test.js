// Import the functions we need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// Wedoku web app's Firebase configuration [VERY IMPORTANT!]
const firebaseConfig = {
  apiKey: "AIzaSyAUqY5UKxho8fC9QNI70YlhpQSoe_r2-2c",
  authDomain: "wedoku-d3500.firebaseapp.com",
  projectId: "wedoku-d3500",
  storageBucket: "wedoku-d3500.appspot.com",
  messagingSenderId: "381287339740",
  appId: "1:381287339740:web:37d81f7ff25213cd044619",
  measurementId: "G-MMBM958V09"
};

// Initialize Firebase
/// Init Firebase app
const app = initializeApp(firebaseConfig);

/// Init Firestore Service
const db = getFirestore()
/// Collection Ref
const colRef = collection(db, 'Users');
/// Get Collection Data
getDocs(colRef)
    .then((snapshot) => {
        let Users = []
        snapshot.docs.forEach((doc) => {
            Users.push({ ...doc.data(), id: doc.id })
        })
        console.log(Users)
    })
    .catch(err => {
        console.log(err.message)
    })


/// Init Analytics
///const analytics = getAnalytics(app);