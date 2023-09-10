<template>
    <main>
        <SudokuSection />
        <DescriptionSection />
    </main>
</template>

<script>
    import SudokuSection from './SudokuSection.vue';
    import DescriptionSection from './DescriptionSection.vue';

    export default {
        components: {
            SudokuSection,
            DescriptionSection
        }
    }
</script>

<style scoped>

</style>