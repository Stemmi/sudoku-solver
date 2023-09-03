<template>
    <main>
        <p>Type or paste a Sudoku here:</p>
        
        <SudokuField />
        <button>Solve</button><br />
        Text / Description<br />
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
    h1 {
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
</style>