<template>
    <td @click="select">
        <form ref="inputForm" v-if="isSelected">
            <input
                :value="inputValue"
                :placeholder="cell||' '"
                type="text"
                size="1"
                @vue:mounted="({ el }) => el.focus()"
                @input="updateValue"
                @keydown="handleSpecialKeys"
                @blur="unselect"
            >
        </form>
        <span v-else>{{ value }}</span>
    </td>
</template>

<script>
    export default {
        data() {
            return {
                inputValue: ''
            };
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
            unselect() {
                this.$emit("updateSelected", undefined);
            },
            updateValue(event) {
                const value = event.target.value;
                if (!+value && value !== " " && +value !== 0) {
                    this.$refs.inputForm.reset();
                    return;
                }
                this.$emit("updateValue", {
                    index: this.cellIndex,
                    value: +event.target.value
                })
                this.$refs.inputForm.reset();
            },
            handleSpecialKeys(event) {
                let targetIndex = [this.cellIndex[0],this.cellIndex[1]];
                switch (event.code) {
                    case 'ArrowDown':
                        targetIndex[0]++;
                        if (targetIndex[0] > 8) targetIndex[0] = 8;
                        this.$emit("updateSelected", targetIndex);
                        break;
                    case 'ArrowUp':
                        targetIndex[0]--;
                        if (targetIndex[0] < 0) targetIndex[0] = 0;
                        this.$emit("updateSelected", targetIndex);
                        break;
                    case 'ArrowLeft':
                        targetIndex[1]--;
                        if (targetIndex[1] < 0) {
                            targetIndex[1] = 8;
                            targetIndex[0]--;
                            if (targetIndex[0] < 0) targetIndex = [0,0];
                        }
                        this.$emit("updateSelected", targetIndex);
                        break;
                    case 'Enter':
                    case 'NumpadEnter':
                        event.preventDefault();
                    case 'ArrowRight':
                        targetIndex[1]++;
                        if (targetIndex[1] > 8) {
                            targetIndex[1] = 0;
                            targetIndex[0]++;
                            if (targetIndex[0] > 8) targetIndex = [8,8];
                        }
                        this.$emit("updateSelected", targetIndex);
                        break;
                }
            }
        },
        computed: {
            value() {
                return this.cell || '';
            },
            isSelected() {
                if (!this.selectedIndex) return false;
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