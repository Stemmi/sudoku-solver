<template>
    <main>
        <h2>Type in a Sudoku here:</h2>
        <!-- <p>Numbers 1-9, or:<br />
            0, Space, →, or Enter for en empty cell</p> -->
        <SudokuField />
        <button>Solve</button>
        <p>Text / Description</p>
    </main>
</template>

<script>
    import SudokuField from './SudokuField.vue';

    export default {
        components: {
            SudokuField
        }
    }
</script>



<style>
    h2 {
        text-align: center;
        font-weight: normal;
        font-size: 1.3em;
        margin: 15px;
    }
    button {
        display: block;
        margin: 20px auto;
        padding: 10px 20px;
        border:  1px solid black;
        border-radius: 20px;
        background-color: rgb(203, 216, 240);
        font-size: 1.3em;
    }
</style>