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
    import sudokuService from '../services/sudokuService.js';
    
    export default {
        components: {
            SudokuCell
        },
        data() {
            return {
                selectedIndex: [0,0]
            }
        },
        props: [
            "sudoku"
        ],
        emits: [
            "updateSudoku"
        ],
        methods: {
            selectNext() {
                this.selectedIndex[1]++;
                if (this.selectedIndex[1] > 8) {
                    this.selectedIndex[0]++;
                    this.selectedIndex[1] = 0;
                }
                if (this.selectedIndex[0] > 8) {
                    this.selectedIndex = [8,8];
                    // this.selectSolveButton();
                }
            },
            select(index) {
                this.selectedIndex = index;
            },
            // selectSolveButton() {
            //     return;
            // },
            handleValueUpdate(cell) {
                const check = sudokuService.check(this.sudoku, cell);
                if (check.passed) {
                    this.$emit('updateSudoku', cell);
                    this.selectNext();
                    return;
                }
            }
        }
    }
</script>

<style scoped>
    table {
        margin: 10px auto;
        border-collapse: collapse;
        border: 2px solid black;
    }

    td {
        border: 1px solid grey;
        width: 38px;
        height: 38px;
        text-align: center;
    }

    tr:nth-child(3n+3) {
        border-bottom: 2px solid black;
    }

    td:nth-child(3n+3) {
        border-right: 2px solid black;
    }
</style>