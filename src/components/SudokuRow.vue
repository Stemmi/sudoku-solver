<template>
    <tr>
        
        <SudokuCell
            v-for="cell, index in row"
            :cell="cell"
            :selectedIndex="selectedIndex"
            :cellIndex="[rowIndex, index]"
            @updateSelected="handleSelection"
            @updateValue="handleValueUpdate"
        />

    </tr>
</template>

<script>
    import SudokuCell from './SudokuCell.vue';

export default {
    components: {
        SudokuCell
    },
    props: [
        "row", "rowIndex", "selectedIndex"
    ],
    emits: [
        "updateSelected", "updateValue"
    ],
    methods: {
        handleSelection(cellIndex) {
            this.$emit("updateSelected", cellIndex);
        },
        handleValueUpdate(updatedCell) {
            this.$emit("updateValue", updatedCell);
        }
    }
}
</script>



<style>


</style>