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
        <div :class="$style.wrapper">
            <div :class="$style.header">
                <div :class="$style.logo"></div>
                <div :class="$style.rule" @click="showRule">活动规则</div>
                <div :class="$style.headerBg"></div>
            </div>
            <div :class="$style.giftBag" v-for="item in giftList">
                <img :class="$style.gitBg"
                     :src="item.giftUrl"/>
                <div :class="$style.content">
                    <div :class="$style.left">
                        <div :class="$style.name">{{item.giftTitle}}</div>
                        <div :class="$style.price">
                            <p>¥&nbsp;<span :class="$style.priceNum">{{item.giftPrize}}</span></p>
                            <p :class="$style.tips">预付金</p>
                        </div>
                    </div>
                    <div :class="$style.right">
                        <div :class="$style.des">{{item.giftDes}}</div>
                    </div>
                </div>
                <div :class="$style.btn" @click="goBuy(item)">
                    立即抢购
                </div>
            </div>
            <div :class="$style.shangdeDetail">
                <div :class="$style.whiteContent">
                    <div :class="$style.broadcast1">
                        <div :class="$style.title"></div>
                        <div :class="$style.tips">学习不止，流量不停</div>
                        <div :class="$style.line">
                            <div :class="$style.blue"></div>
                            <div :class="$style.orange"></div>
                        </div>
                        <div :class="$style.tips2">
                            尚德机构与中国电信战略合作推出
                        </div>
                        <div :class="$style.bItem">
                            <div :class="[$style.item, $style.item1]">
                                <div :class="$style.icon1"></div>
                                <div>前3个月免费</div>
                            </div>
                            <div :class="[$style.item, $style.item2]">
                                <div :class="$style.icon2"></div>
                                <div>全国不限流量</div>
                            </div>
                            <div :class="[$style.item, $style.item3]">
                                <div :class="$style.icon3"></div>
                                <div>每月200分钟免费通话</div>
                            </div>
                            <div :class="[$style.item, $style.item4]">
                                <div :class="$style.icon4"></div>
                                <div>免费来电提醒</div>
                            </div>
                            <div :class="[$style.item, $style.item5]">
                                <div :class="$style.icon5"></div>
                                <div>优酷高德地图等应用免流量使用</div>
                            </div>
                        </div>
                        <div :class="$style.fenge"></div>
                    </div>
                    <div :class="$style.broadcast2">
                        <div :class="$style.title"></div>
                        <div :class="$style.tips">学习是一种信仰</div>
                        <div :class="$style.line">
                            <div :class="$style.blue"></div>
                            <div :class="$style.orange"></div>
                        </div>
                        <div :class="[$style.broadcast2Item, $style.broadcast2Item1]">
                            <div>15年成人职业教育培训经验低门槛考本科</div>
                            <div :class="$style.pic1"></div>
                        </div>
                        <div :class="[$style.broadcast2Item, $style.broadcast2Item2]">
                            <div :class="$style.pic2"></div>
                            <div>全面线上学习模式直播+录播</div>
                        </div>
                        <div :class="[$style.broadcast2Item, $style.broadcast2Item3]">
                            <div>IPO美股上市职业教育领域的领跑者</div>
                            <div :class="$style.pic3"></div>
                            <div :class="$style.leftYuan"></div>
                            <div :class="$style.rightYuan"></div>
                        </div>
                    </div>
                    <div :class="$style.broadcast3">
                        <div :class="$style.title"></div>
                        <div :class="$style.line">
                            <div :class="$style.blue"></div>
                            <div :class="$style.orange"></div>
                        </div>
                        <div :class="[$style.broadcast3Item, $style.broadcast3Item1]">
                            <div :class="$style.pic1"></div>
                            <div>自考培训全方位网络课程</div>
                        </div>
                        <div :class="[$style.broadcast3Item, $style.broadcast3Item2]">
                            <div>培训通过率高代65%高出全国平均值2倍</div>
                            <div :class="$style.pic2"></div>
                        </div>
                        <div :class="[$style.broadcast3Item, $style.broadcast3Item3]">
                            <div :class="$style.pic3"></div>
                            <div>内部教材高频浓缩题库</div>
                        </div>
                        <div :class="[$style.broadcast3Item, $style.broadcast3Item4]">
                            <div>培训通过率高代65%高出全国平均值2倍</div>
                            <div :class="$style.pic4"></div>
                        </div>
                        <div :class="[$style.broadcast3Item, $style.broadcast3Item5]">
                            <div :class="$style.pic5"></div>
                            <div>培训通过率高代65%高出全国平均值2倍</div>
                        </div>
                        <div :class="[$style.broadcast3Item, $style.broadcast3Item6]">
                            <div>培训通过率高代65%高出全国平均值2倍</div>
                            <div :class="$style.pic6"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
        timer: any
        $refs: {
            code: HTMLFormElement,
            phone: HTMLFormElement
        }
        giftList: any[] = []
        activtyRule: string = ''
        actInfoId: number
        currentGiftId: number
        $style: any


        async created() {
            let giftContent: any
            try {
                giftContent = await this.getActivity()
                this.activtyRule = giftContent.content
                this.actInfoId = giftContent.id
            } catch (error) {
                giftContent = {giftList: []}
            }
            this.giftList = giftContent.giftList
        }

        getActivity() {
            return apiCall.post('/mk/award/getActivity')
        }

        mounted() {
        }

        modalClose(): void {
            this.$emit('modal:close')
        }
        loginClose():void{
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
                let depositData : depositDataTmp = {
                    mobile: this.$refs.phone.value,
                    actInfoId: this.actInfoId,
                    giftId: this.currentGiftId
                }
                this.$emit('alertModal:close')
                apiCall.post('/mk/nine/sales/createDeposit', depositData ).then(()=>{
                    this.$emit('alert:mode', {
                        txt: '登录成功',
                        type: 'alertToast'
                    })
                    MtaH5.clickStat('logined')
                })
            })
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
            apiCall.post('/sms/getSmsCheckCode', {
                mobile: this.$refs.phone.value
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
            }).catch(()=>{
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
        margin-top: 110px;
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
        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/indexBg.png') no-repeat;
        background-size: cover;
        padding-bottom: 121px;
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

    　.headerBg {
        width: 750px;
        height: 764px;
        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/headerBg3.png') no-repeat;
        background-size: 100% 100%;
    }

    .giftBag {
        position: relative;
        margin: 80px auto 0 auto;
        width: 689px;
        .gitBg {
            width: 689px;
            height: 312px;
            position: absolute;
            z-index: 3;
            top: 0;
            left: 0;
        }
        .content {
            display: flex;
            width: 689px;
            height: 312px;
            position: relative;
            z-index: 5;
            left: 0;
            color: #fff;
            top: 0;
            .left {
                flex: none;
                width: 210px;
                display: flex;
                height: 312px;
                justify-content: space-between;
                flex-direction: column;
                .name {
                    padding: 36px 13px 0 13px;
                    font-size: 37px;
                    font-weight: 600;
                    text-align: center;
                    color: rgba(255, 255, 255, 1);
                }
                .price {
                    font-size: 32px;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    padding: 0 13px 17px 13px;
                    p {
                        line-height: 1;
                        text-align: center;
                    }
                    .priceNum {
                        font-size: 38px;
                    }
                    .tips {
                        margin-top: 18px;
                    }
                }
            }
            .right {
                flex: 1;
                padding: 0 37px 0 20px;
                display: flex;
                align-items: center;
            }
        }
        .btn {
            width: 539px;
            height: 88px;
            line-height: 88px;
            text-align: center;
            background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/gitBtn.png') no-repeat;
            background-size: 100% 100%;
            margin: 30px auto 0 auto;
            font-size: 40px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
        }
    }

    .shangdeDetail {
        width: 690px;
        height: 4143px;
        border: 6px solid rgba(255, 0, 0, 1);
        border-radius: 25px;
        margin: 130px auto 0 auto;
        padding: 14px;
        .whiteContent {
            background: #fff;
            height: 100%;
            border-radius: 25px;
            .broadcast1 {
                display: flex;
                align-items: center;
                flex-direction: column;
                padding-top: 93px;
                .title {
                    width: 177px;
                    height: 57px;
                    position: relative;
                    background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/shangCard.png') no-repeat;
                    background-size: 100% 100%;
                }
                .tips {
                    font-size: 30px;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 1);
                    margin-top: 16px;
                    line-height: 1;
                }
                .line {
                    margin-top: 23px;
                }
                .tips2 {
                    font-size: 24px;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 1);
                    margin-top: 49px;
                    line-height: 1;
                }
                .bItem {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin-top: 83px;
                    align-items: flex-start;
                    .item {
                        width: 145px;
                        /*flex: 1;*/
                        font-size: 24px;
                        font-weight: 400;
                        color: rgba(0, 0, 0, 1);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin-bottom: 48px;
                        &.item1 {
                            margin-right: 80px;
                        }
                        &.item2 {
                            margin-right: 80px;
                        }
                        &.item3 {
                        }
                        &.item4 {
                            margin-right: 80px;
                        }
                        &.item5 {
                        }
                    }
                    .icon1 {
                        width: 107px;
                        height: 106px;
                        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/s_date.png') no-repeat;
                        background-size: 100% 100%;
                        margin-bottom: 8px;
                    }
                    .icon2 {
                        width: 108px;
                        height: 108px;
                        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/s_data.png') no-repeat;
                        background-size: 100% 100%;
                        margin-bottom: 8px;
                    }
                    .icon3 {
                        width: 107px;
                        height: 106px;
                        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/s_phone.png') no-repeat;
                        background-size: 100% 100%;
                        margin-bottom: 8px;
                    }
                    .icon4 {
                        width: 103px;
                        height: 108px;
                        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/s_ling.png') no-repeat;
                        background-size: 100% 100%;
                        margin-bottom: 8px;
                    }
                    .icon5 {
                        width: 87px;
                        height: 105px;
                        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/s_map.png') no-repeat;
                        background-size: 100% 100%;
                        margin-bottom: 8px;
                    }
                }
            }
            .broadcast2 {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 140px;
                .title {
                    width: 237px;
                    height: 58px;
                    position: relative;
                    background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/shangde.png') no-repeat;
                    background-size: 100% 100%;
                }
                .tips {
                    font-size: 30px;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 1);
                    margin-top: 16px;
                }
                .line {
                    margin-top: 25px;
                }
                .broadcast2Item {
                    display: flex;
                    position: relative;
                    justify-content: space-around;
                    align-items: center;
                    font-size: 32px;
                    font-weight: 600;
                    color: rgba(51, 51, 51, 1);
                    .pic1 {
                        margin-left: 40px;
                        flex: none;
                        width: 354px;
                        height: 198px;
                        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/bpic1.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    .pic2 {
                        flex: none;
                        margin-right: 40px;
                        width: 353px;
                        height: 198px;
                        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/bpic2.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    .pic3 {
                        flex: none;
                        margin-left: 40px;
                        width: 352px;
                        height: 198px;
                        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/bpic3.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    &.broadcast2Item1 {
                        padding: 60px 14px;
                        border-bottom: 1px solid rgba(255, 0, 0, 1);
                    }
                    &.broadcast2Item2 {
                        padding: 34px 14px;
                        border-bottom: 1px solid rgba(255, 0, 0, 1);
                    }
                    &.broadcast2Item3 {
                        padding: 58px 14px 89px 14px;
                        border-bottom: 1px dashed rgba(161, 161, 161, 1);
                    }
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
            }
            .broadcast3 {
                margin-top: 141px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .title {
                    width: 239px;
                    height: 59px;
                    position: relative;
                    background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/shangdeyou.png') no-repeat;
                    background-size: 100% 100%;
                }
                .line {
                    margin-top: 33px;
                    margin-bottom: 52px;
                }
                .broadcast3Item {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    font-size: 32px;
                    font-weight: 600;
                    padding: 22px 14px;
                    border-bottom: 1px solid rgba(255, 177, 47, 1);
                    color: rgba(51, 51, 51, 1);
                    &:last-child {
                        border: 0;
                    }
                    .pic1 {
                        margin-right: 88px;
                        flex: none;
                        width: 233px;
                        height: 209px;
                        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/lpic1.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    .pic2 {
                        margin-left: 82px;
                        flex: none;
                        width: 233px;
                        height: 222px;
                        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/lpic2.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    .pic3 {
                        margin-right: 88px;
                        flex: none;
                        width: 233px;
                        height: 222px;
                        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/lpic3.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    .pic4 {
                        margin-left: 144px;
                        flex: none;
                        width: 218px;
                        height: 222px;
                        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/lpic4.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    .pic5 {
                        margin-right: 88px;
                        flex: none;
                        width: 233px;
                        height: 201px;
                        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/lpic5.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    .pic6 {
                        margin-left: 91px;
                        flex: none;
                        width: 233px;
                        height: 196px;
                        background: url('https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/lpic6.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }
    }

</style>
