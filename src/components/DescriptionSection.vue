<template>
    <section>
        <p>I programmed the underlying program logic in JavaScript in 2021 as an exercise during a Covid illness.
            In the first place I wanted to build something in a well-organized, strictly object-orientated design.
            For the Sudoku-solving, it was important for me to try out and combine different approaches and to learn how well human approaches can be translated into computer language.
            The program initially considers two different approaches.
            If it then gets stuck, it solves the Sudoku by simple trial and error :-)
        </p>
        <p>The frontend was added in 2023, it's made with vue.js.
            Just type in the numbers or choose an example and hit "Solve".
        </p>
        <ul>On the to do list for improvement:
            <li>Giving better feedback for invalid typing</li>
            <li>Pasting a Sudoku in different formats</li>
        </ul>
        <p>Source code: <a href="https://github.com/Stemmi/sudoku-solver" target="_blank">https://github.com/Stemmi/sudoku-solver</a></p>
        <p>Have fun!</p>
        <p>Christian</p>
    </section>
</template>

<script>

</script>

<style scoped>
    p, ul {
        text-align: left;
        font-size: 1.1em;
    }

    @media screen and (min-width: 992px) {
        section {
            margin-top: 44px;
        }
    }
</style>