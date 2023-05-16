<script lang="ts">
    import { initializeApp } from "firebase/app";
    import { getFirestore, collection, getDoc, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, where, serverTimestamp, orderBy} from "firebase/firestore";
    import { getAuth, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, type User } from 'firebase/auth'   
    import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } from "$env/static/private";

    const firebaseConfig = {
        apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId
    }

    // Initialize Firebase
    /// Init Firebase app
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)

    /// Init Firestore Service
    const db = getFirestore()
    

    /// Collection Ref
    const colRef = collection(db, 'Users');

    const q = query(colRef, orderBy('createdAt'))

    /// Get Collection Data
    /// Real time Collection data
    onSnapshot(colRef, (snapshot) => {
        let Users: { id: string; }[] = []
        snapshot.docs.forEach((doc) => {
            Users.push({ ...doc.data(), id: doc.id })
        })
        console.log(Users)
    })

    /// Signing up a new User
    const signUpForm = document.querySelector('.modal-signup')
    signUpForm!.addEventListener('submit', (e) => {
        e.preventDefault()

        const email = signUpForm!.email.value       /// The .email refers to the type in <input type="email" name="email"> of HTML
        const password = signUpForm!.password.value  /// Same thing as above

        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                return db.collection('Users').doc(cred.user.uid).set({
                    username: signUpForm!['username'].value,        /// The .signup-username refers to the type in <input type="signup-user" name="email"> of HTML I think. Saw this sample from like Firebase 8 or smth. Lfmao
                    email: signUpForm!['email'].value
                })
            })
            .catch((err) => {
                console.log(err.message)
            }).then(() => {
                console.log('User created:', cred.user)
                signUpForm!.reset()
            })
    })

    
    /// Logging in and out
    const loginForm = document.querySelector('.login')
        loginForm!.addEventListener('submit', (e) => {
        e.preventDefault()

        const email = loginForm!.email.value
        const password = loginForm!.password.value

        signInWithEmailAndPassword(auth, email, password)
            .then(cred => {
            //console.log('User Logged in:', cred.user)
            loginForm!.reset()
            })
            .catch(err => {
            console.log(err.message)
            })
        })
</script>