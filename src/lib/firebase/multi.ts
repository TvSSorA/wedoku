import type { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, type User } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc, type DocumentData } from "firebase/firestore";
import { auth, db } from "./app";
import { writable } from "svelte/store";
import type { UserDoc } from "$lib/types";
import { getDatabase, ref, set } from "firebase/database";

var roomID: string;
const rtdb = getDatabase();


export function createRoom() {
    const db = getFirestore();
    const roomCreate = addDoc(collection(db, "rooms"), {
        winner: "",
        time: ""
    })

    const roomRef = collection(db, 'rooms')
    const roomId = roomRef.id
    createRoomRT(roomId);
}

export function createRoomRT(roomID: string) {

    set(ref(rtdb, 'rooms/' + roomID + 'redTeam/'), {
        playerID: "",
        puzzleInitial: "",
        puzzlerCurrent: "",
        time: ""

    })

    set(ref(rtdb, 'rooms/' + roomID + 'blueTeam/'), {
        playerID: "",
        puzzleInitial: "",
        puzzlerCurrent: "",
        time: ""
    })
}

export function setBlueTeam(roomID: string) {

    set(ref(rtdb, 'rooms/' + roomID + 'blueTeam/'), {
        playerID: "",
        puzzleInitial: "",
        puzzlerCurrent: "",
        time: ""
    })
}

export function setRedTeam(roomID: string) {

    set(ref(rtdb, 'rooms/' + roomID + 'redTeam/'), {
        playerID: "",
        puzzleInitial: "",
        puzzlerCurrent: "",
        time: ""
    })
}