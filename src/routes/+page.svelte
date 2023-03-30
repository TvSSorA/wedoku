<script lang="ts">
    export let data;

    console.log(data.board);
    
    const indexes: Record<number, number[]> = {
        0: [0, 1, 2],
        1: [3, 4, 5],
        2: [6, 7, 8]
    }

    function calculateColIndex(box: number): number {
        let boxIndex = box;
        let period = -1;

        while (boxIndex >= 0) {
            period += 1;
            boxIndex -= 3;
        }

        return period;
    } 
</script>

<div class="board">
    {#each Array(9) as _, i}
        {@const rowIndex = i % 3}
        {@const colIndex = calculateColIndex(i)}
        <div class="box box-{i}">
            {#each indexes[rowIndex] as row}
                {#each indexes[colIndex] as col}
                    <div class="cell row-{row} col-{col}">
                        <p class="digit">{data.board[row][col] === 0 ? "" : data.board[row][col]}</p>
                    </div>
                {/each}
            {/each}
        </div>
    {/each}
</div>

<style lang="scss">
    .board {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);

        margin: auto;

        width: 500px; // fix these later
        height: 500px; // hhhhh
        border: 4px solid $board-border-color;

        .box {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
            border: 2px solid $board-border-color;

            .cell {
                text-align: center;
                border: 1px solid $cell-border-color;
                
                .digit {
                    display: inline;
                    font-size: 250%;
                    user-select: none;
                }
            }
        }
    }
</style>