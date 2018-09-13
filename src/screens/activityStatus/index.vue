<template>
    <div :class="$style.wrapper">
        <div :class="$style.IconType">
            <img :src="pic"/>
        </div>
        <div :class="$style.errorTxt">{{errorTxt}}</div>
    </div>
</template>

<script lang="ts">
    import apiCall from 'util/xhr'
    import {Component, Vue} from 'vue-property-decorator'

    @Component
    export default class error extends Vue {
        $route: any
        pic: string = ''
        errorTxt: string = ''

        created() {
            let enterType = this.$route.query.enterType
            switch (enterType){
                case 'notWechat':
                    this.errorTxt = '需要在微信内才可以正在参与活动，请使用微信扫码参与'
                    this.pic = 'https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/NotInWechat.png'
                    break
                case 'notStart':
                    this.errorTxt = '活动还没开始哦，请留意你的学习规划师通知'
                    this.pic = 'https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/noStart.png'
                    break
                case 'activityEnd':
                    this.errorTxt = '活动已结束，感谢参与'
                    this.pic = 'https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/endActivity.png'
                    break
            }
        }

        mounted() {

        }
    }
</script>

<style lang="less" module>
    .wrapper {
        padding: 0 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #fff;
        padding-top: 300px;
        width: 100%;
        /*height: 100%;*/
    }

    .IconType {
        img {
            width: 395px;
            height: 269px;
        }
    }
    .errorTxt{
        margin-top: 30px;
    }
</style>
