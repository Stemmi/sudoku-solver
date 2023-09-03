<template>
    <td @click="select">
        <input
            v-if="isSelected"
            type="text"
            size="1"
            @vue:mounted="({ el }) => el.focus()"
            @input="updateValue"
        >
        <span v-else>{{ value }}</span>
        

    </td>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: [
            "cell", "cellIndex", "selectedIndex"
        ],
        emits: [
            "updateSelected", "updateValue"
        ],
        methods: {
            select() {
                this.$emit("updateSelected", this.cellIndex);
            },
            updateValue(event) {
                this.$emit("updateValue", {
                    index: this.cellIndex,
                    value: event.target.value
                })
            } 
        },
        computed: {
            value() {
                return this.cell || '';
            },
            isSelected() {
                return (this.cellIndex[0] === this.selectedIndex[0]
                    && this.cellIndex[1] === this.selectedIndex[1]
                );
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