import type { FirebaseError } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
                    userName: profile.displayName,
                    email: profile.email,
                    photo: profile.photoURL,
                    dark: true,   //This is light/dark mode
                    music: true,
                    sound: true,
                    notifications: true,
                  };
                  setDoc(doc(db, "users", user.uid), userRef, {merge: true});
                  signIntoRealTime(user.uid, profile.displayName, "", "", "");
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

export function signIntoRealTime(userId: string, userName: any, startPuzzle: string, nowPuzzle: string, answerPuzzle: string) {
    const db = getFirestore(app);
    const rtdb = getDatabase(app);
    const referenceRT = ref(rtdb, 'users/' + userId);

    set(referenceRT, {
      username: userName,
      puzzleIntial: startPuzzle,
      puzzleCurrent: nowPuzzle,
      solution: answerPuzzle,
    });
}