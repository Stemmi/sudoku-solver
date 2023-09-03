<template>
    <td>
        
    {{ display }}

    </td>
</template>

<script>
    export default {
        props: [
            "cell"
        ],
        computed: {
            display() {
                if (!Number.isInteger(+this.cell)) return;
                else if (this.cell >= 1 && this.cell <= 9) return this.cell;
                else return;
            }
        }
    }
</script>



<style>


</style>