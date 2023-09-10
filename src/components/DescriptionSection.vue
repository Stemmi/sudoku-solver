<template>
    <section>
        <p>I programmed the underlying program logic in JavaScript in 2021 as an exercise during a Covid illness.
            It was important for me to try out and combine different approaches to solving the Sudoku and to learn how well human approaches can be translated into computer language.
            The program initially considers three different approaches.
            If it then gets stuck, it solves the Sudoku by simple trial and error :-)
        </p>

        <p>The frontend was added in 2023.
            Just type in the numbers or choose an example.
        </p>
        <p>On the to do list for improvement:
            Pasting a Sudoku in different formats, giving better feedback for invalid typing.</p>
        <p>Source code: <a href="https://github.com/Stemmi/sudoku-solver" target="_blank">https://github.com/Stemmi/sudoku-solver</a></p>
        <p>Have fun!</p>
        <p>Christian</p>
    </section>
</template>

<script>

</script>

<style scoped>
    p {
        text-align: left;
        font-size: 1.1em;
    }

    @media screen and (min-width: 992px) {
        section {
            margin-top: 160px;
        }
    }
</style>