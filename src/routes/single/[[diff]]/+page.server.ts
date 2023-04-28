import type { PageServerLoad } from "./$types";
import { getBoard } from "$lib/server/boardFirebase"

export const load = (async ({ params: { diff } }) => {
    if (diff) {
        return getBoard(diff);
    }
    else {
        return getBoard("easy");
    }

}) satisfies PageServerLoad

