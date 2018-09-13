<template>
    <div :class="$style.wapperBg" id="wapper">
        <poxBox>
            <div v-if="alertType === 'rule'" slot="alert">
                <div :class="$style.ruleContent">
                    <div @click="modalClose" :class="$style.modalClose">
                        <div :class="$style.yuanBg">
                            <div :class="$style.cha"></div>
                        </div>
                    </div>
                    <div :class="$style.top">活动规则</div>
                    <div :class="$style.contentTxt">
                        {{activtyRule}}
                    </div>
                    <div :class="$style.bottom"></div>
                </div>
            </div>
            <div v-if="alertType === 'login'" slot="alert" :class="$style.login">
                <div :class="$style.loginClose" @click="loginClose"></div>
                <div :class="$style.loginLogo"></div>
                <div :class="$style.logoTxt">
                    <p>购买商品需要进行手机号登录，</p>
                    <p>登录后商品将以该手机号身份信息进行发放。</p>
                </div>
                <div :class="$style.inputBox">
                    <div :class="$style.phoneIcon"></div>
                    <input placeholder="请输入手机号" ref="phone"/>
                </div>
                <div :class="$style.inputBox">
                    <div :class="$style.pwIcon"></div>
                    <input placeholder="请输入验证码" ref="code"/>
                    <div :class="$style.getCode" v-if="codeStatus === 'getCode'" @click="getCode">获取验证码</div>
                    <div :class="$style.reciprocal" v-if="codeStatus === 'reciprocal'">{{reciprocalTxt}}</div>
                </div>
                <div :class="$style.loginBtn" @click="goLoginPay">登录</div>
            </div>
        </poxBox>
        <div :class="$style.wrapper" :style="`background:${themeColor? themeColor : '#FFAF4F'}`">
            <div :class="$style.header">
                <div :class="$style.logo"></div>
                <div :class="$style.rule" @click="showRule">活动规则</div>
                <div :class="$style.countBox">
                    <div :class="$style.hour">{{hour}}</div>
                    <div>时</div>
                    <div :class="$style.minute">{{minute}}</div>
                    <div>分</div>
                    <div :class="$style.second">{{second}}</div>
                    <div>秒之后结束</div>
                </div>
                <!--<div :class="$style.giftNav"></div>-->
                <div :class="$style.headerBox"></div>
                <img :class="$style.headerBg" :src="activityHeadUrl"/>
            </div>
            <div :class="$style.giftBagBox">
                <div :class="$style.giftBag" v-for="item in giftList">
                    <img :class="$style.gitBg"
                         :src="item.giftUrl"/>
                    <div :class="$style.content">
                        <div :class="$style.left">
                            <div :class="$style.name">{{item.giftTitle}}</div>
                            <div :class="$style.des">{{item.giftDes}}</div>
                        </div>
                        <div :class="$style.right">
                            <div :class="$style.price">
                                ¥{{item.giftPrize}}
                            </div>
                            <div :class="$style.buyBtn" @click="goBuy(item)">立即抢购</div>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="$style.detailPic">
                <img v-lazy="activityDetailUrl"/>
            </div>
            <div :class="$style.fenge"></div>
            <div :class="$style.compyDetail">
                <img v-lazy="'//static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/b_compy.png'"/>
            </div>
            <div :class="$style.footer">
                <img v-lazy="'//static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/s_footer.png'"/>
            </div>
        </div>
        <!--支付-->
        <form :action="formAction" method="post" id="form-pay">
            <input type="hidden" name="orderNumber" :value="formValue" id="orderInput">
            <!--<input type="hidden" name="termType" value="mobile">-->
        </form>
    </div>
</template>

<script lang="ts">
    import apiCall from 'util/xhr'
    import {Component, Vue} from 'vue-property-decorator'
    import poxBox from 'components/poxBox/poxBox'

    interface indexToastObj {
        type: string;
        txt?: string;
    }

    interface depositDataTmp {
        mobile: number,
        actInfoId: number,
        giftId: number
    }

    @Component({
        components: {
            poxBox
        }
    })
    export default class index extends Vue {
        alertType: string = ''
        codeStatus: string = 'getCode'
        reciprocalTxt: number = 60
        timer: number
        $refs: {
            code: HTMLFormElement,
            phone: HTMLFormElement
        }
        giftList: any[] = []
        activtyRule: string = ''
        actInfoId: number
        currentGiftId: number
        $style: any
        $route: any
        $router: any
        hour: string | number = '00'
        minute: string | number = '00'
        second: string | number = '00'
        activityHeadUrl: string = ''
        activityDetailUrl: string = ''
        CountTimer: number
        themeColor: string = ''
        formAction: string = ''
        formValue: string | number = ''


        async mounted() {
            let query = this.$route.query
            let activityContent: any
            this.$emit('modal', {
                type: 'loading',
                icon: 'eat'
            })
            try {
                activityContent = await this.getActivity(query)
                this.activtyRule = activityContent.content
                this.actInfoId = activityContent.id
                this.activityHeadUrl = activityContent.activityHeadUrl
                this.themeColor = activityContent.themeColor
                this.activityDetailUrl = activityContent.activityDetailUrl
            } catch (error) {
                activityContent = {giftList: []}
            }
            this.giftList = activityContent.giftList
            let startTime: number = activityContent.startTime
            let currentTime: number = activityContent.currentTime
            let endTime: number = activityContent.endTime
            if (startTime > currentTime) {
                this.$router.push({
                    path: '/status',
                    query: {
                        enterType: 'notStart'
                    }
                })
            }
            if (endTime < currentTime) {
                this.$router.push({
                    path: '/status',
                    query: {
                        enterType: 'activityEnd'
                    }
                })
            }
            //活动进行中
            if (startTime < currentTime && currentTime < endTime) {
                let countTime: number = endTime - currentTime
                this.countDateTime(countTime)
                this.CountTimer = setInterval(() => {
                    countTime -= 1000
                    if (countTime <= 0) {
                        countTime = 0
                        this.$router.push({
                            path: '/status',
                            query: {
                                enterType: 'activityEnd'
                            }
                        })
                        clearInterval(this.CountTimer)
                    }
                    this.countDateTime(countTime)
                }, 1000)
            }
            this.modalClose()
        }

        getActivity(query) {
            return apiCall.post('/mk/award/getActivity', {
                id: query.id
            })
        }

        countDateTime(countTime) {
            let countHour: number = Math.floor(countTime / 1000 / 60 / 60)
            let countMin: number = Math.floor(countTime / 1000 / 60 % 60)
            let countSecond: number = countTime / 1000 % 60
            this.hour = (countHour >= 0 && countHour < 10) ? `0${countHour}` : countHour
            this.minute = (countMin >= 0 && countMin < 10) ? `0${countMin}` : countMin
            this.second = (countSecond >= 0 && countSecond < 10) ? `0${countSecond}` : countSecond
        }

//        mounted() {
//        }

        modalClose(): void {
            this.$emit('modal:close')
        }

        loginClose(): void {
            clearInterval(this.timer)
            this.codeStatus = 'getCode'
            this.modalClose()
        }

        goLoginPay(): void {
            let reg: any = /^1[0-9]{10}$/;
            if (!this.$refs.phone.value) {
                this.$emit('alert:mode', {
                    txt: '请输入手机号',
                    type: 'alertToast'
                })
                return
            }
            if (!reg.test(this.$refs.phone.value)) {
                this.$emit('alert:mode', {
                    txt: '输入正确的11位手机号',
                    type: 'alertToast'
                })
                return
            }
            if (!this.$refs.code.value) {
                this.$emit('alert:mode', {
                    txt: '请输入验证码',
                    type: 'alertToast'
                })
                return
            }
            this.$emit('alert:mode', {
                type: 'alertLoading'
            })
            apiCall.post('/mk/nine/sales/authPhoneBySms', {
                phoneNumber: this.$refs.phone.value,
                smsCode: this.$refs.code.value
            }).then(() => {
                let depositData: depositDataTmp = {
                    mobile: this.$refs.phone.value,
                    actInfoId: this.actInfoId,
                    giftId: this.currentGiftId
                }
                this.$emit('alertModal:close')
                apiCall.post('/mk/nine/sales/createDeposit', depositData).then((data) => {
                    this.$emit('alert:mode', {
                        txt: '登录成功',
                        type: 'alertToast'
                    })
                    MtaH5.clickStat('logined')
                    this.goPaying(data)
                }).catch(() => {
                    this.$emit('modal', {
                        type: 'toast',
                        txt: '登录失败'
                    })
                })
            })
        }

        goPaying(data): void {
            this.formValue = data.depositNo;
            this.formAction = data.url;
            (<HTMLFormElement>document.getElementById('form-pay')).submit();
        }

        indexAlertMode(obj: indexToastObj): void {
            this.$emit('alert:mode', {
                txt: obj.txt,
                type: obj.type
            })
        }

        getCode(): void {
            this.$emit('alert:mode', {
                type: 'alertLoading'
            })
            apiCall.post('/sms/getSmsCode', {
                phoneNumber: this.$refs.phone.value
            }).then(() => {
                this.$emit('alertModal:close')
                this.codeStatus = 'reciprocal'
                this.timer = setInterval(() => {
                    this.reciprocalTxt--
                    if (this.reciprocalTxt === 0) {
                        clearInterval(this.timer)
                        this.codeStatus = 'getCode'
                        this.reciprocalTxt = 60
                    }
                }, 1000)
            }).catch(() => {
                this.$emit('alertModal:close')
            })
        }

        goBuy(obj): void {
            MtaH5.clickStat('clkbuy')
            this.currentGiftId = obj.giftId
            this.alertType = 'login'
            clearInterval(this.timer)
            this.$emit('modal', {
                type: 'alert'
            })
        }

        showRule(): void {
            this.alertType = 'rule'
            this.$emit('modal', {
                type: 'alert',
                mask: true
            })
        }
    }
</script>

<style lang="less" module>
    .fenge {
        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/fenge.png') no-repeat;
        width: 172px;
        height: 28px;
        background-size: 100% 100%;
        margin: 114px auto 0 auto;
    }

    .ruleContent {
        width: 620px;
        position: relative;
        height: 712px;
        .top {
            background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/alertTopBg.png') no-repeat;
            width: 100%;
            height: 101px;
            background-size: 100% 100%;
            font-size: 36px;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            line-height: 101px;
            text-align: center;
        }
        .contentTxt {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 611px;
            background: #fff;
            padding: 0 53px;
            border-radius: 0 0 10px 10px;
            font-size: 28px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 48px;
        }
        .bottom {
            background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/alertBottomBg.png') no-repeat;
            width: 549px;
            height: 26px;
            background-size: 100% 100%;
            position: absolute;
            bottom: -13px;
            left: 50%;
            transform: translateX(-50%);
        }
        .modalClose {
            height: 42px;
            width: 42px;
            position: absolute;
            right: -21px;
            top: -21px;
            .yuanBg {
                background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/yuan.png') no-repeat;
                width: 42px;
                height: 42px;
                background-size: 100% 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .cha {
                background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/cha.png') no-repeat;
                width: 21px;
                height: 21px;
                background-size: 100% 100%;
            }
        }
    }

    .login {
        padding-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        position: relative;
        height: 100%;
        background: #fff;
        .loginClose {
            background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/i_close.png') no-repeat;
            width: 32px;
            height: 32px;
            right: 30px;
            top: 20px;
            position: absolute;
            z-index: 99;
            background-size: 100% 100%;
        }
        .loginLogo {
            background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/loginLogo.png') no-repeat;
            width: 398px;
            height: 64px;
            background-size: 100% 100%;
        }
        .logoTxt {
            margin-top: 126px;
            text-align: center;
            font-size: 26px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 36px;
            margin-bottom: 38px;
        }
        .inputBox {
            width: 600px;
            height: 102px;
            background: #ECE8E8;
            border-radius: 10px;
            margin-top: 19px;
            display: flex;
            padding-left: 10px;
            align-items: center;
            input {
                width: 254px;
                margin-left: 49px;
                border: 0;
                background: #ECE8E8;
                outline: none;
            }
            .phoneIcon {
                background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/phoneIcon.png') no-repeat;
                background-size: 100% 100%;
                width: 48px;
                height: 50px;
            }
            .pwIcon {
                background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/pwIcon.png') no-repeat;
                background-size: 100% 100%;
                width: 48px;
                height: 50px;
            }
            .getCode, .reciprocal {
                margin-left: 61px;
                font-size: 20px;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 51px;
                width: 147px;
                height: 51px;
                text-align: center;
                background: rgba(250, 92, 46, 1);
                border-radius: 10px;
            }
        }
        .loginBtn {
            width: 595px;
            height: 78px;
            background: rgba(250, 92, 46, 1);
            border-radius: 39px;
            font-size: 40px;
            line-height: 78px;
            text-align: center;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            margin-top: 39px;
        }
    }

    .line {
        position: relative;
        .blue {
            background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/bLine.png') no-repeat;
            width: 75px;
            height: 9px;
            position: relative;
            left: 5px;
            z-index: 1;
            background-size: 100% 100%;
        }
        .orange {
            background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/oLine.png') no-repeat;
            width: 75px;
            height: 9px;
            right: 5px;
            z-index: 3;
            bottom: 5px;
            position: relative;
            background-size: 100% 100%;
        }
    }

    .wrapper {
        width: 750px;
        padding-bottom: 73px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .wapperBg {
        background: #FFB500;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .logo {
        position: absolute;
        z-index: 3;
        width: 199px;
        height: 33px;
        top: 50px;
        left: 31px;
        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/logo.png') no-repeat;
        background-size: 100% 100%;
    }

    .rule {
        border: 1px solid #fff;
        border-radius: 21px;
        position: absolute;
        z-index: 3;
        padding: 10px 15px;
        top: 50px;
        right: 68px;
        font-size: 24px;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 1;
    }

    .headerBox {
        width: 750px;
        height: 1060px;
    }

    .headerBg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 750px;
        height: 1332px;
    }

    .header {
        position: relative;
    }

    .countBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        bottom: 14px;
        left: 50%;
        z-index: 3;
        font-size: 28px;
        transform: translateX(-50%);
        width: 420px;
        .hour, .minute, .second {
            width: 50px;
            height: 50px;
            color: #fff;
            line-height: 50px;
            text-align: center;
            background: red;
            border-radius: 10px;
        }
    }

    .giftNav {
        position: absolute;
        bottom: 23px;
        left: 50%;
        z-index: 3;
        transform: translateX(-50%);
        width: 25px;
        height: 45px;
        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/giftNav.png') no-repeat;
        background-size: cover;
        animation: giftNavDown infinite 2s linear;
    }

    @keyframes giftNavDown {
        0% {
            transform: translate(0px, -10px);
        }
        50% {
            transform: translate(0px, 20px);
        }
        100% {
            transform: translate(0px, -10px);
        }
    }

    .giftBagBox {
        position: relative;
        z-index: 2;
        width: 690px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 25px;
        padding-top: 40px;
        padding-bottom: 20px;
        margin: 0 auto;
        .giftBag {
            position: relative;
            margin: 0 auto 20px auto;
            width: 648px;
            .gitBg {
                width: 648px;
                height: 221px;
                position: absolute;
                z-index: 3;
                top: 0;
                left: 0;
            }
            .content {
                display: flex;
                width: 100%;
                height: 221px;
                position: relative;
                z-index: 5;
                left: 0;
                color: #fff;
                top: 0;
                .left {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    .name {
                        font-weight: 600;
                        text-align: center;
                        line-height: 1;
                        color: rgba(255, 255, 255, 1);
                        font-size: 62px;
                    }
                    .des {
                        margin-top: 22px;
                        width: 346px;
                        height: 26px;
                        background: rgba(255, 255, 255, 1);
                        font-size: 20px;
                        font-weight: normal;
                        color: rgba(102, 102, 102, 1);
                        text-align: center;
                        line-height: 26px;
                    }
                }
                .right {
                    width: 230px;
                    flex: none;
                    padding: 45px 0 40px 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .price {
                        line-height: 1;
                        font-size: 74px;
                        font-weight: 600;
                        color: rgba(255, 255, 255, 1);
                        p {
                            text-align: center;
                        }
                    }
                    .buyBtn {
                        margin-top: 30px;
                        width: 133px;
                        height: 51px;
                        background: rgba(255, 255, 255, 1);
                        font-size: 25px;
                        font-weight: 600;
                        color: rgba(255, 63, 38, 1);
                        line-height: 51px;
                        text-align: center;
                        border-radius: 25px;
                        position: relative;
                        bottom: 10px;
                    }
                }
            }
        }
    }

    .detailPic {
        margin: 50px auto 0 auto;
        width: 720px;
        img {
            width: 100%;
            height: 923px;
        }
    }

    .compyDetail {
        margin: 89px auto 0 auto;
        width: 690px;
        height: 1042px;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .footer {
        margin: 50px 0 0 31px;
        width: 727px;
        height: 1526px;
        img {
            width: 100%;
            height: 100%;
        }
    }

</style>
