import type { PageServerLoad } from "./$types";
import { Sudoku } from "$lib/server/board";

export const load = (async () => {
    let boardToSolve = new Sudoku(9, 40)
    boardToSolve.fillValues()

    const fullBoard = boardToSolve.toArray().map(row => [...row])

    boardToSolve.removeDigits()

    return { fullBoard, board: boardToSolve.toArray() }

}) satisfies PageServerLoad

