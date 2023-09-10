<template>
    <main>
        <h2>Choose an example...</h2>
        <div class="buttons" @click="chooseSudoku">
            <button class="choose" id="easy">Easy</button>
            <button class="choose" id="medium">Medium</button>
            <button class="choose" id="hard">Hard</button>
            <br />
            <button class="choose" id="empty">Empty / Reset</button>
        </div>
        <h2>...or type in a Sudoku here:</h2>
        <!-- <p>Numbers 1-9, or:<br />
            0, Space, →, or Enter for en empty cell</p> -->
        <SudokuField :sudoku="sudoku" @updateSudoku="handleValueUpdate"/>
        <button class="solve" @click="solveSudoku">Solve</button>
        <p>Text / Description</p>
    </main>
</template>

<script>
    import SudokuField from './SudokuField.vue';
    import sudokuService from '../services/sudokuService.js';
    import SudokuSolver from '../services/solver.js';

    export default {
        data() {
            return {
                sudoku: sudokuService.empty,
            }
        },
        components: {
            SudokuField
        },
        methods: {
            chooseSudoku(event) {
                if (event.target.tagName != "BUTTON") return;
                this.sudoku = sudokuService.clone(sudokuService[event.target.id]);
            },
            handleValueUpdate(cell) {
                const check = sudokuService.check(this.sudoku, cell);
                console.log(check);

                if (check.passed) {
                    this.sudoku[cell.index[0]][cell.index[1]] = cell.value;
                    return;
                }
            },
            solveSudoku() {
                const solver = new SudokuSolver(this.sudoku);
                const solvedSudoku = solver.solve();
                if (solvedSudoku.solved) this.sudoku = solvedSudoku.sudoku;
                else return // HANDLE UNSOLVABLE SUDOKU
            }
        }
    }
</script>

<style>
    h2 {
        text-align: center;
        font-weight: normal;
        font-size: 1.3em;
        margin: 10px;
    }
    button.solve {
        display: block;
        margin: 20px auto;
        padding: 10px 20px;
        border:  1px solid black;
        border-radius: 50px;
        background-color: rgb(203, 216, 240);
        font-size: 1.3em;
    }
    div.buttons {
        text-align: center;
        margin: 5px auto;
    }
    button.choose {
        padding: 5px 10px;
        margin: 5px;
        border: none;
        border-radius: 20px;
        background-color: rgb(203, 216, 240);
        font-size: 1em;
    }

    button:hover, input[type=file]::file-selector-button:hover {
        box-shadow: 0 0px 3px 0 rgba(203, 216, 240,0.8);
        transform: scale(1.05);
    }

    button:active {
        background: rgba(203, 216, 240,0.5);
    }
    /* button.selected {
        border:  1px solid black;
    } */
</style>