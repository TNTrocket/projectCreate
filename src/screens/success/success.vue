<template>
    <div :class="$style.wrapper">
        <div :class="$style.content">
            <div :class="$style.whiteContent">
                <div :class="$style.title">支付成功</div>
                <div :class="$style.tips">订单详情</div>
                <div :class="$style.price">
                    <div :class="$style.txt">订单金额：</div>
                    <div :class="$style.number">¥{{depositObj.depositAmount}}</div>
                </div>
                <div :class="$style.phone">
                    <div :class="$style.txt">联系方式：</div>
                    <div :class="$style.number">{{depositObj.mobile}}</div>
                </div>
                <div :class="$style.target">
                    <div :class="$style.txt">缴纳定金目的：</div>
                    <div :class="$style.txt2">{{depositObj.purpose}}</div>
                    <div :class="$style.leftYuan"></div>
                    <div :class="$style.rightYuan"></div>
                </div>
                <div :class="$style.codeBorder">
                  <div :class="$style.qrCode"></div>
                </div>
                <div :class="$style.codeTips">
                    <p>长按扫码进入尚德个人中心校程序</p>
                    <p>查看优惠券和现金券</p>
                </div>
            </div>
        </div>
        <div :class="$style.payTips">
            <p>退款说明</p>
            <p>1、已经使用优惠券，或者现金券，不能发起退款。</p>
            <p>2、活动期间不能发起退款。</p>
            <p>3、活动结束后，如需退款，请联系你的咨询师。</p>
        </div>
    </div>
</template>

<script lang="ts">
    import apiCall from 'util/xhr'
    import { Component, Vue} from 'vue-property-decorator'

    @Component
    export default class success extends Vue {
        depositObj: object = {}
        $route: any

        created() {
            let depositNo = this.$route.query.depositNo
            apiCall.post('mk/nine/sales/getDeposit',{
                depositNo
            }).then((data)=>{
                this.depositObj = data
            })
        }

        mounted() {

        }
    }
</script>

<style lang="less" module>
    .wrapper {
        padding: 30px 30px 40px 30px;
        width: 100%;
        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/payBg.png') no-repeat;
        background-size: cover;
    }

    .content {
        margin: 0 auto;
        width: 690px;
        height: 1167px;
        border: 6px solid rgba(255, 0, 0, 1);
        border-radius: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .whiteContent {
        width: 650px;
        height: 1127px;
        background: #ffffff;
        border-radius: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 1;
            margin-top: 40px;
            font-size: 36px;
        }
        .tips {
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            margin-top: 29px;
            font-size: 30px;
            line-height: 1;
            margin-bottom: 24px;
        }
        .price {
            .number {
                color: red;
            }
        }
        .target {
            padding: 0 32px 107px 29px !important;
            border-bottom: 1px dashed rgba(161, 161, 161, 1);
            position: relative;
            .leftYuan {
                width: 34px;
                height: 68px;
                border-radius: 0 34px 34px 0;
                background: #FFA502;
                position: absolute;
                z-index: 9;
                bottom: -34px;
                left: 0;
            }
            .rightYuan {
                width: 34px;
                height: 68px;
                border-radius: 34px 0 0 34px;
                background: #FFA502;
                position: absolute;
                z-index: 9;
                bottom: -34px;
                right: 0;
            }
        }
        .price, .phone, .target {
            width: 100%;
            display: flex;
            margin-top: 32px;
            justify-content: space-between;
            font-size: 30px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            padding: 0 32px 0 29px;
            line-height: 1;
        }
        .codeBorder {
            width: 413px;
            height: 393px;
            border: 4px solid rgba(255, 0, 0, 1);
            border-radius: 25px;
            margin-top: 92px;
            display: flex;
            justify-content: center;
            align-items: center;
            .qrCode{
                width: 400px;
                height: 380px;
                border-radius: 25px;
                background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/s_me.png') no-repeat;
                background-size: cover;
                background-position: 20px 0;
            }
        }
        .codeTips {
            font-size: 26px;
            font-weight: 400;
            color: rgba(236, 0, 0, 1);
            line-height: 48px;
            margin-top: 29px;
            text-align: center;
        }
    }

    .payTips {
        margin-top: 40px;
        font-size:20px;
        font-weight:400;
        color:rgba(254,254,254,1);
        line-height:48px;
    }
</style>
