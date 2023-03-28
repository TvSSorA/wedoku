export class Sudoku {
    N: number;
    K: number;
    SRN: number;
    board: number[][];

    constructor(N: number, K: number) {
        this.N = N;
        this.K = K;
        this.SRN = Math.floor(Math.sqrt(N))
 
        this.board = Array.from({
            length: N
        }, () => Array.from({
            length: N
        }, () => 0));
    }

    fillValues() {
        this.fillDiagonal();
        this.fillRemaining(0, this.SRN);
    }

    unusedInBox(rowStart: number, colStart: number, num: number) {
        for (let i = 0; i < this.SRN; i++) {
            for (let j = 0; j < this.SRN; j++) {
                if (this.board[rowStart + i][colStart + j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    unusedInRow(i: number, num: number) {
        for (let j = 0; j < this.N; j++) {
            if (this.board[i][j] === num) {
                return false;
            }
        }
        return true;
    }

    unusedInCol(j: number, num: number) {
        for (let i = 0; i < this.N; i++) {
            if (this.board[i][j] === num) {
                return false;
            }
        }
        return true;
    }

    checkIfSafe(i: number, j: number, num: number) {
        return (
            this.unusedInRow(i, num) &&
            this.unusedInCol(j, num) &&
            this.unusedInBox(i - (i % this.SRN), j - (j % this.SRN), num)
        );
    }

    fillBox(row: number, col: number) {
        let num = 0;

        for (let i = 0; i < this.SRN; i++) {
            for (let j = 0; j < this.SRN; j++) {
                while (true) {
                    num = Math.floor(Math.random() * this.N + 1)
                    if (this.unusedInBox(row, col, num)) {
                        break;
                    }
                }
                this.board[row + i][col + j] = num;
            }
        }
    }

    fillDiagonal() {
        for (let i = 0; i < this.N; i += this.SRN) {
            this.fillBox(i, i);
        }
    }

    fillRemaining(i: number, j: number): boolean {
        if (i === this.N - 1 && j === this.N) {
            return true;
        }
 
        if (j === this.N) {
            i += 1;
            j = 0;
        }
 
        if (this.board[i][j] !== 0) {
            return this.fillRemaining(i, j + 1);
        }
 
        for (let num = 1; num <= this.N; num++) {
            if (this.checkIfSafe(i, j, num)) {
                this.board[i][j] = num;
                if (this.fillRemaining(i, j + 1)) {
                    return true;
                }
                this.board[i][j] = 0;
            }
        }

        return false;
    }
 
    printBoard() {
        for (let i = 0; i < this.N; i++) {
            console.log(this.board[i].join(" "));
        }
    }
}

