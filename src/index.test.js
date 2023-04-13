<<<<<<< HEAD
=======
// Import the functions we need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDoc, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, where, serverTimestamp, createUserWithEmailAndPassword} from "firebase/firestore";
import { getAuth, signInWithPopup, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

// Initialize Firebase
/// Init Firebase app
const app = initializeApp(firebaseConfig);

/// Init Firestore Service
const db = getFirestore()
const auth = getAuth()

/// Collection Ref
const colRef = collection(db, 'Users');

const q = query(colRef, orderBy('createdAt'))

/// Get Collection Data
/// Real time Collection data
onSnapshot(colRef, (snapshot) => {
    let Users = []
    snapshot.docs.forEach((doc) => {
        Users.push({ ...doc.data(), id: doc.id })
    })
    console.log(Users)
})

/// Adding a User. This is use with a form.
/// All form when regarding the adding of a collectiong with the field, HTML and .js ALWAYS have to match the one on the Firebase DB

/// To be revisted and repurposed
const addColForm = document.querySelector('.add')  /// .add refers to the class or form (idk which) of the form in html. Col stands for Collection
addColForm.addEventListener('submit', (e) => {     /// submit 
    e.preventDefault

    addDoc(colRef, {
        Username: addUserForm.Username.value,
        Password: addUserForm.Password.value,
        createdAt: serverTimestamp(),
    })
    .then(() => {
        addUserForm.reset()
    })
})

/// Signing up a new User
const signUpForm = document.querySelector('.signup')
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signUpForm.email.value        /// The .email refers to the type in <input type="email" name="email"> of HTML
    const password = signUpForm.password.value  /// Same thing as above

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            return db.collection('Users').doc(cred.user.uid).set({
                username: signUpForm['signup-username'].value,        /// The .signup-username refers to the type in <input type="signup-user" name="email"> of HTML I think. Saw this sample from like Firebase 8 or smth. Lfmao
                email: signUpForm['email'].value
            })
        })
        .catch((err) => {
            console.log(err.message)
        }).then(() => {
            console/log('User created:', cred.user)
            signUpForm.reset()
        })
})

/// Logging in and out
/// Logging out is coded for the purpose of using a button in mind 
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      //console.log('User Signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})


/// Logging in
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      //console.log('User Logged in:', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})

/// Subscribing to Auth Changes
onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
})


/// Deleting a User. This is use with a form
/// All form when regarding the adding of a collectiong with the field, HTML and .js ALWAYS have to match the one on the Firebase DB

/// To be revisted
const deletingUserForm = document.querySelector('.delete')  /// .delete refers to the class of the form in html
deletingUserForm.addEventListener('submit', (e) => {
    e.preventDefault

    const docRef = doc(db, 'Users', deletingUserForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deletingUserForm.reset()
        })

})

/// Get a single User data
const docRef = doc(db, 'User', /**/)

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

/// Updating a User data using Form
/// All form when regarding the updating of a user with the field Username and Password, ALWAYS use Username & Password. DO NOT use the lowercase
const updatingUserForm = document.querySelector('.update')  /// .update refers to the class of the form in html
updatingUserForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'User', updatingUserForm.id.value)
    
    updateDoc(docRef, {
        Username: 'updated usename'
    })
    .then(() => {
        updatingUserForm.reset
    })

})




/// Init Analytics
///const analytics = getAnalytics(app);
>>>>>>> Comments update before testing
