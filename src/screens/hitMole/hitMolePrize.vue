<template>
    <div :class="$style.hitMoleWrapper">
        <div :class="$style.bg">
            <div :class="$style.prizeList">
                <div :class="$style.list">
                    <div>
                        <span>奖品：</span>
                        <span :class="$style.prizeName">{{prizeName}}</span>
                    </div>
                    <div>
                        <span>考试类型：</span>
                        <span :class="$style.prizeName">{{examName}}</span>
                    </div>
                    <div>
                        <span>科目：</span>
                        <span :class="$style.prizeName">{{subjectName}}</span>
                    </div>
                </div>
            </div>
            <div :class="$style.phoneInput">
                <input placeholder="输入领取邮箱" ref="email" @input="inputChange"/>
            </div>
            <div :class="$style.whiteLine"></div>
            <div :class="$style.emailError" v-if="emailError">{{emailTxt}}</div>
            <div :class="$style.getPrize" @click="getPrize">确认领取</div>
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
                emailError: false,
                emailTxt: '',
                prizeName: '',
                examName: '',
                subjectName: ''
            }
        },
        created() {
            let {prizeName = '', examName = '', subjectName = ''} = this.$route.query;
            this.prizeName = prizeName
            this.examName = examName
            this.subjectName = subjectName
        },
        mounted() {

        },
        methods: {
            getPrize() {
                if(this.isH5APP()) {
                    let {phone = ""} = this.$route.query;
                    let email = this.$refs.email.value
                    if (!email) {
                        this.emailError = true
                        this.emailTxt = '请输入邮箱'
                        return false
                    }
                    let emailReg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/
                    if (!emailReg.test(email)) {
                        this.emailError = true
                        this.emailTxt = '请输入正确的邮箱'
                        return false
                    }
                    Indicator.open()
                    apiCall.post('/interview/exchangeByVerificationCode', {phoneNo: phone, email}).then(() => {
                        Indicator.close()
                        apiCall.get('/interview/dailyCollection/',{id:6})
                        MessageBox({
                            message: "领取奖品成功",
                            showConfirmButton: true,
                            title: "",
                            confirmButtonText: "确认",
                            closeOnClickModal: false
                        });
                    }).catch((msg) => {
                        Indicator.close()
                        MessageBox({
                            message: msg,
                            showConfirmButton: true,
                            title: "",
                            confirmButtonText: "确认",
                            closeOnClickModal: false
                        });
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
                this.emailError = false
                this.emailTxt = ''
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

    .prizeList {
        background: url("../../img/prizeList.png") no-repeat;
        width: 543px;
        height: 255px;
        background-size: contain;
        margin: 552px auto 0 auto;
        position: relative;
        .list {
            position: absolute;
            top: 0.3rem;
            left: 1.8rem;
            font-size: 24px;
            > div {
                display: flex;
                padding: 5px 0;
                justify-content: space-between;
                .prizeName{
                    width: 200px;
                    height: 50px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    text-align: center;
                    font-size: 24px;
                    color: #EE6A4C;
                    background: #FFF5E3;
                    border-radius: 43px;
                    line-height: 50px;
                }
            }
        }
    }

    .phoneInput {
        width: 489px;
        height: 45px;
        margin: 96px auto 0 auto;
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

    .emailError {
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

    .getPrize {
        margin: 52px auto 0 auto;
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
