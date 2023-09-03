<template>
    <td @click="selected=true">
        <input
            v-if="selected"
            type="text"
            size="1"
            @vue:mounted="({ el }) => el.focus()"
        >
    {{ value }}

    </td>
</template>

<script>
    export default {
        data() {
            return {
                selected: false
            }
        },
        props: [
            "cell"
        ],
        methods: {

        },
        computed: {
            value() {
                if (!Number.isInteger(+this.cell)) return;
                else if (this.cell >= 1 && this.cell <= 9) return this.cell;
                else return;
            }
        }
    }
</script>



<style>
    input {
        font-size: 1.5em;
        width: 100%;
        height: 100%;
        text-align: center;
    }

</style>