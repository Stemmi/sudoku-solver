<template>
    <main>
        <p>Type or paste a Sudoku here:</p>
        
        <SudokuField />
        <button>Solve</button><br />
        <p>Text / Description</p>
        <br />
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