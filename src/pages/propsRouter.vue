<template>
    <div>
        <h2 class="hello">Hello {{name}} {{ $attrs }}</h2>
    </div>
</template>

<script>
    export default {
        name: "propsRouter",
        props: {
            name: {
                type: String,
                default: 'Vue!'
            }
        }
    }
</script>

<style scoped lang='less'>

</style>
