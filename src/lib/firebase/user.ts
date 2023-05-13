import type { FirebaseError } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { collection, getFirestore, doc, setDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./app";

const auth = getAuth(app);


export function signInGoogle() {
    const provider = new GoogleAuthProvider();
    const db = getFirestore(app);

    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential!.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            if (user !== null) {
                user.providerData.forEach((profile) => {
                  const userRef = {
                    dark: true,   //This is light/dark mode
                    music: true,
                    sound: true,
                    notifications: true,
                  };
                  
                  setDoc(doc(db, "users", user.uid), userRef, {merge: true});
                  signIntoRealTime(user.uid, "", "", "");
                });

                onAuthStateChanged(auth, (user) => {
                  if (user) {
                    // User is signed in, see docs for a list of available properties
                    const uid = user.uid;
                    // ...
                  } else {
                    // User is signed out
                    // ...
                  }
                });
            }

            // Get Provider User into Firestore
            
        }).catch((error: FirebaseError) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData?.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    
}

export function signIntoRealTime(userId: string, startPuzzle: string, nowPuzzle: string, answerPuzzle: string) {
    const db = getFirestore(app);
    const rtdb = getDatabase(app);
    const referenceRT = ref(rtdb, 'users/' + userId);

    set(referenceRT, {
      puzzleIntial: startPuzzle,
      puzzleCurrent: nowPuzzle,
      solution: answerPuzzle,
    });
}