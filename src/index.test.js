// Import the functions we need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore } from "firebase/firestore";

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