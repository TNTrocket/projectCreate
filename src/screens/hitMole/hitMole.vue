<template>
    <div :class="$style.hitMoleWrapper">
        <div :class="$style.bg">
            <div :class="$style.phoneInput">
                <input placeholder="输入手机号" ref="phone" @input="inputChange"/>
            </div>
            <div :class="$style.whiteLine"></div>
            <div :class="$style.phoneError" v-if="phoneError">{{phoneTxt}}</div>
            <div :class="$style.nextStep" @click="nextStep">下一步</div>
            <div :class="$style.tips">奖品将在7个工作日内发到邮箱~记得查收哦</div>
        </div>
    </div>
</template>

<script>
    import apiCall from 'util/xhr'
    import {MessageBox, Indicator} from 'mint-ui';

    export default {
        data() {
            return {
                phoneError: false,
                phoneTxt: ''
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            nextStep() {
                if(this.isH5APP()) {
                    let phone = this.$refs.phone.value
                    if (!phone) {
                        this.phoneError = true
                        this.phoneTxt = '请输入手机号'
                        return false
                    }
                    let phoneReg = /^1[0-9]{10}$/
                    if (!phoneReg.test(phone)) {
                        this.phoneError = true
                        this.phoneTxt = '请输入正确的手机号'
                        return false
                    }
                    Indicator.open()
                    apiCall.post('/interview/exchangeByPhone', {phoneNo: phone}).then((data) => {
                        Indicator.close()
                        if (data.isExist === 0) {
                            MessageBox({
                                message: "该手机号未进行奖品的登记",
                                showConfirmButton: true,
                                title: "",
                                confirmButtonText: "确认",
                                closeOnClickModal: false
                            });
                            return false
                        }
                        if (data.hasGot === 1) {
                            MessageBox({
                                message: "该手机号已经领取了奖品",
                                showConfirmButton: true,
                                title: "",
                                confirmButtonText: "确认",
                                closeOnClickModal: false
                            });
                            return false
                        }
                        if (data.isExist === 1 && data.hasGot === 0) {
                            this.$router.push({
                                path: 'hitMolePrize',
                                query: {
                                    phone: phone,
                                    prizeName: data.prizeName,
                                    examName: data.examName,
                                    subjectName: data.subjectName
                                }
                            })
                        }
                    })
                }else{
                    MessageBox({
                        message: "请下载「伴你考教师」APP 领奖",
                        showConfirmButton: true,
                        title: "提示",
                        confirmButtonText: "确认",
                        closeOnClickModal: false
                    }).then((action)=>{
                        if(action ==='confirm'){
                            window.open('http://a.app.qq.com/o/simple.jsp?pkgname=com.sunlands.qbank.teacher&ckey=CK1393261071755','_self')
                        }
                    });
                }

            },
            inputChange() {
                this.phoneError = false
                this.phoneTxt = ''
            },
            isH5APP() {
                let ua = navigator.userAgent.toUpperCase();
                if (ua.match(/IOS_QBANK/i) == "IOS_QBANK" || ua.match(/ANDROID_QBANK/i) == "ANDROID_QBANK") {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
</script>

<style lang="less" module>
    .hitMoleWrapper {
        height: 100%;
    }

    .bg {
        background: url("../../img/hitMoleBg.png") no-repeat;
        width: 750px;
        height: 1333px;
        background-size: 100% 100%;
        overflow-y: hidden;
        position: relative;
    }

    .phoneInput {
        width: 489px;
        height: 45px;
        margin: 700px auto 0 auto;
        font-size: 32px;

        input {
            font-size: 32px;
            background: transparent;
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            color: #fff;
            &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                color: #fff;
                text-align: center;
            }
        }
    }

    .phoneError {
        text-align: center;
        margin-top: 15px;
        color: red;
        font-size: 24px;
    }

    .whiteLine {
        width: 513px;
        height: 3px;
        margin: 27px auto 0 auto;
        background: #fff;
    }

    .nextStep {
        margin: 212px auto 0 auto;
        width: 556px;
        height: 80px;
        background: #4DA6BB;
        border: 1px solid #4DA6BB;
        border-radius: 100px;
        color: #fff;
        line-height: 80px;
        text-align: center;
        font-size: 36px;
    }

    .tips {
        font-size: 28px;
        color: #4DA6BB;
        text-align: center;
        margin: 103px auto 0 auto;
    }
</style>
