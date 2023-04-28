import { env } from "$env/dynamic/private";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export function authenticate() {
    const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } = env;

    const firebaseConfig = { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return db
}