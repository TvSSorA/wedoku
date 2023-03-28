import { Sudoku } from "$lib/server/board";

let sudoku = new Sudoku(9, 40)
sudoku.fillValues()
sudoku.printBoard()