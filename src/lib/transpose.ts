export function shuffleRow(board: number[][], fullBoard: number[][]) {
    for (let block = 0; block < 3; ++block)
    {
        for (let i = 2; i > 0; --i)
        {
            const j = Math.floor(Math.random() * i);
            if (i == j) continue;

            const first = block * 3 + i;
            const second = block * 3 + j;
            [board[first], board[second]] = [board[second], board[first]];
            [fullBoard[first], fullBoard[second]] = [fullBoard[second], fullBoard[first]];
        }
    }
    return { board, fullBoard }
}

export function shuffleColumn(board: number[][], fullBoard: number[][]) {
    for (let block = 0; block < 3; ++block)
    {
        for (let i = 2; i > 0; --i)
        {
            const j = Math.floor(Math.random() * i);
            if (i == j) continue;

            const first = block * 3 + i;
            const second = block * 3 + j;
            
            for (let row = 0; row < 9; ++row)
            {
                [board[row][first], board[row][second]] = [board[row][second], board[row][first]];
                [fullBoard[row][first], fullBoard[row][second]] = [fullBoard[row][second], fullBoard[row][first]];
            }
        }
    }
    return { board, fullBoard }
}
