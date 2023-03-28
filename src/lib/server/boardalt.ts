function shift(arr: number[], num: number) {
    const left = arr.slice(0, num)
    const right = arr.slice(num)

    return [...right, ...left]
}

function shuffle(array: number[]) {
    let currentIndex = array.length,    randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function shuffleRow(board: number[][]) {
    let currentIndex = board.length,    randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        board[currentIndex], board[randomIndex] = board[randomIndex], board[currentIndex];
    }

    return board;
}

function shuffleColumn(board: number[][]) {
    let currentIndex = board.length,    randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        for (let i = 0; i < 9; i++) { 
            board[i][currentIndex], board[i][randomIndex] = board[i][randomIndex], board[i][currentIndex];
        }
        
    }

    return board;
}

export function generateBoard() {
    let board: number[][] = [];
    let row: number[] = shuffle(Array.from({length: 9}, (_, i) => i + 1))
    
    for (let i = 0; i < 9; i++) {
        row = shift(row, i % 3 === 0 ? 1 : 3)
        board.push(row)
    }

    shuffleRow(board)
    shuffleColumn(board)

    for (let i = 0; i < 9; i++) { // shuffle columns
        let idx_1 = Math.floor(Math.random() * 9 + 1)
        let idx_2 = Math.floor(Math.random() * 9 + 1)

        while (idx_1 === idx_2) {
            idx_1 = Math.floor(Math.random() * 9 + 1)
            idx_2 = Math.floor(Math.random() * 9 + 1)
        }

        for (let j = 0; j < 9; j++) {
            board[j][idx_1], board[j][idx_2] = board[j][idx_2], board[j][idx_1] 
        }
    }

    for (let i = 0; i < 9; i++) {
        console.log(board[i].join("  "))
    }
}