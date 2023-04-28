import { getDocs, query, collection, where } from "firebase/firestore";
import { authenticate } from "./auth";
import { shuffleColumn, shuffleRow } from "$lib/transpose";

export async function getBoard(diff: string) {
    // Auth and query raw string board
    const db = authenticate();

    const colRef = collection(db, "boards");
    const q = query(colRef, where("difficulty", "==", diff));

    const boardCollection = (await getDocs(q)).docs;
    const boardIndex = Math.floor(Math.random() * (boardCollection.length - 1));
    const rawBoard = boardCollection[boardIndex].data()

    // Turn to 2D array
    const { difficulty, puzzle, solution } = rawBoard;

    let fullBoard: number[][] = []
    let board: number[][] = []

    for (let i = 0; i < 81; i += 9) {
        let rawRowPuzzle: string = puzzle.slice(i, i + 9);
        let rawRowSolution: string = solution.slice(i, i + 9);
        let puzzleRowToPush: number[] = [];
        let solutionRowToPush: number[] = [];

        for (let j = 0; j < rawRowPuzzle.length; j++) {
            puzzleRowToPush.push(parseInt(rawRowPuzzle[j]));
            solutionRowToPush.push(parseInt(rawRowSolution[j]));
        }

        board.push(puzzleRowToPush);
        fullBoard.push(solutionRowToPush);
    }

    // Shuffle

    ({ board, fullBoard } = shuffleColumn(board, fullBoard));
    ({ board, fullBoard } = shuffleRow(board, fullBoard));

    return { difficulty, fullBoard, board }
}