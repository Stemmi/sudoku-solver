<template>
    <table>
        
        <SudokuRow v-for="row in sudoku" :row="row"/>

    </table>
</template>

<script>
    import SudokuRow from './SudokuRow.vue';

    export default {
        components: {
            SudokuRow
        },
        data() {
            return {
                sudoku: this.createEmptySudoku()
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