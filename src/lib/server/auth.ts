import { env } from "$env/dynamic/private";
import { FirebaseError, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup,  } from "firebase/auth";

export function authenticate() {
    const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } = env;

    const firebaseConfig = { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return db
}

export function signInGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider;

    document.getElementById("loginGoogle")?.addEventListener('click', function(){
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential!.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
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
    })
}