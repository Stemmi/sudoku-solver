<template>
    <tr>
        
        <SudokuCell v-for="cell in row" :cell="cell"/>

    </tr>
</template>

<script>
    import SudokuCell from './SudokuCell.vue';

export default {
    components: {
        SudokuCell
    },
    props: [
        "row"
    ]
}
</script>



<style>


</style>