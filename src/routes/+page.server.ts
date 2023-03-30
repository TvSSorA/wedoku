import type { PageServerLoad } from "./$types";
import { Sudoku } from "$lib/server/board";

export const load = (async () => {
    let sudoku = new Sudoku(9, 40)
    sudoku.fillValues()

    return {
        board: sudoku.toArray()
    }

}) satisfies PageServerLoad

