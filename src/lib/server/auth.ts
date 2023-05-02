import { env } from "$env/dynamic/private";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export function authenticate() {
    const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } = env;

    const firebaseConfig = { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId };
    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);
    const auth = getAuth(app);

    return { db, auth }
}