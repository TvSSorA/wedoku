import type { PageServerLoad } from "./$types";
import { getBoard } from "$lib/server/boardFirebase"

export const load = (async () => {
    const { difficulty, fullBoard, board } = await getBoard("normal");

    return { difficulty, fullBoard, board }

}) satisfies PageServerLoad

