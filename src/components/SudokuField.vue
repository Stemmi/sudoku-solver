<template>
    <table>
        <tr v-for="row, rowIndex in sudoku">
            <SudokuCell
                v-for="cell, columnIndex in row"
                :cell="cell"
                :selectedIndex="selectedIndex"
                :cellIndex="[rowIndex, columnIndex]"
                @updateSelected="select"
                @updateValue="handleValueUpdate"
            />
        </tr>
    </table>
</template>

<script>
    import SudokuCell from './SudokuCell.vue';


    export default {
        components: {
            SudokuCell
        },
        data() {
            return {
                sudoku: this.createEmptySudoku(),
                selectedIndex: [0,0]
            }
        },
        methods: {
            createEmptySudoku() {
                const sudoku = [];
                for (let i = 0; i < 9; i++) {
                    const row = [];
                    for (let j = 0; j < 9; j++) {
                        row.push(0);
                    }
                    sudoku.push(row);
                }
                return sudoku;
            },
            selectNext() {
                this.selectedIndex[1]++;
                if (this.selectedIndex[1] > 8) {
                    this.selectedIndex[0]++;
                    this.selectedIndex[1] = 0;
                }
            },
            select(index) {
                this.selectedIndex = index;
            },
            handleValueUpdate(cell) {
                this.sudoku[cell.index[0]][cell.index[1]] = cell.value;
                this.selectNext();
            }
        }
    }
</script>



<style>
    table {
        margin: 10px 0;
        border-collapse: collapse;
        border: 2px solid black;
    }

    td {
        border: 1px solid grey;
        width: 40px;
        height: 40px;
        text-align: center;
    }

    tr:nth-child(3n+3) {
        border-bottom: 2px solid black;
    }

    td:nth-child(3n+3) {
        border-right: 2px solid black;
    }

</style>