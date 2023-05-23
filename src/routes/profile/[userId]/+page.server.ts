import { db } from "$lib/firebase/app";
import type { PageServerLoad } from "./$types";
import { doc, getDoc } from "firebase/firestore"

export const load = (async ({ params: { userId } }) => {
    const userData = (await getDoc(doc(db, "users", userId))).data()!;

    return { soloGames: userData.soloGameHistory, pvpGames: userData.pvpGameHistory}
}) satisfies PageServerLoad;