<template>
    <div :class="$style.wrapper">
        <div :class="$style.bg">
            <div :class="$style.bg1"></div>
            <div :class="$style.bg2"></div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="less" module>
    .wrapper {
        height: 100%;
    }

    .bg {
        background: url("../../img/flow.jpg") no-repeat;
        width: 750px;
        height: 2676px;
        background-size: 100% 100%;
        overflow-y: hidden;
        position: relative;
    }

    .bg1 {
        background: url("../../img/flow1.png") no-repeat;
        width: 670px;
        height: 604px;
        background-size: 100% 100%;
        overflow-y: hidden;
        position: absolute;
        left: 40px;
        top: 378px;
    }

    .bg2 {
        background: url("../../img/flow2.png") no-repeat;
        width: 670px;
        height: 1214px;
        background-size: 100% 100%;
        overflow-y: hidden;
        position: absolute;
        left: 40px;
        top: 1042px;
    }
</style>
