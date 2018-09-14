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
                    this.pic = 'https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/canNotPay.png'
                    break
                case 'REFUNDING':
                    this.errorTxt = '定金正在进行退款中，预计在4个工作日内完成，请留意微信提醒'
                    this.pic = 'https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/canNotPay.png'
                    break
                case 'OCCUPIED':
                    this.errorTxt = '定金已经使用了，请联系你的学习规划师查看报名状态'
                    this.pic = 'https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/canNotPay.png'
                    break
                case 'REFUNDFAILED':
                    this.errorTxt = '定金退款失败，请联系你的学习规划师查看具体问题'
                    this.pic = 'https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/canNotPay.png'
                    break
                case 'unknown':
                    this.errorTxt = '请联系你的学习规划师查看具体问题'
                    this.pic = 'https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/canNotPay.png'
                    break
            }
        }

        mounted() {

        }
    }
</script>

<style lang="less" module>
    .wrapper {
        padding: 0 100px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #fff;
        padding-top: 300px;
        width: 100%;
        font-size: 28px;
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
