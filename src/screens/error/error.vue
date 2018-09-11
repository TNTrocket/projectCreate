<template>
    <div :class="$style.wrapper">

    </div>
</template>

<script lang="ts">
    import apiCall from 'util/xhr'
    import { Component, Vue} from 'vue-property-decorator'

    @Component
    export default class error extends Vue {
        platformType: String = 'ios'
        channel: String

        created() {
        }

        mounted() {

        }
    }
</script>

<style lang="less" module>
    .wrapper {
        padding: 30px 30px 40px 30px;
        width: 100%;
        background-size: cover;
        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/payBg.png') no-repeat;
    }
</style>
