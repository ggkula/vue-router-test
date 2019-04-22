<template>
    <div>
        <p>这是第{{id}}页</p>
    </div>
</template>

<script>
    export default {
        name: "activeRouter",
        data() {
            return {
                id: '',
            }
        },
        created() {
            this.getParams();
        },
        methods: {
            getParams() {
                this.id = this.$route.params.id;
            }
        }
    }
</script>

<style scoped lang='less'>

</style>
