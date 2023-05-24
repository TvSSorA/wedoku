import type { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, signOut, type User } from "firebase/auth";
import { doc, setDoc, type DocumentData, getDoc } from "firebase/firestore";
import { auth, db } from "./app";
import { writable } from "svelte/store";
import type { UserDoc } from "$lib/types";

const userCred = writable<User | null>(null); // Data from Auth
const userData = writable<DocumentData | null>(null); // Custom data from docs
export { userCred, userData }

export function signInGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential!.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            const currentUserData = await getDoc(doc(db, "users", user.uid))
            if (user !== null && !(currentUserData.exists())) {
                const userObj: UserDoc = {
                    onlineStatus: "online",
                    settings: {
                        dark: true,   //This is light/dark mode
                        music: true,
                        sound: true,
                        showOnlineStatus: true,
                        notifications: true
                    },
                    soloGameHistory: [

                    ],
                    pvpGameHistory: [

                    ],
                    friends: [

                    ],
                    savedGame: null
                };
                setDoc(doc(db, "users", user.uid), userObj, {  merge: true });
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

export function signOutUser() {
    signOut(auth)
        .catch((error) => {
            console.log(error)
        })
}