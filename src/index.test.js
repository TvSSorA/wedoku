// Import the functions we need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

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

/// Adding a User. This is use with a form.
/// All form when regarding the adding of a user with the field Username and Password, ALWAYS use Username & Password. DO NOT use the lowercase
const addUserForm = document.querySelector('.add')
addUserForm.addEventListener('submit', (e) => {
    e.preventDefault

    addDoc(colRef, {
        Username: addUserForm.Username.value,
        Password: addUserForm.Password.value,
    })
    .then(() => {
        addUserForm.reset()
    })
})

/// Deleting a User. This is use with a form
/// All form when regarding the adding of a user with the field Username and Password, ALWAYS use Username & Password. DO NOT use the lowercase
const deletingUserForm = document.querySelector('.delete')
deletingUserForm.addEventListener('submit', (e) => {
    e.preventDefault

    const docRef = doc(db, 'Users', deletingUserForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deletingUserForm.reset()
        })

})

/// Updating a User data
/// 
const updaingUser = doc();

/// Init Analytics
///const analytics = getAnalytics(app);