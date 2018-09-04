<template>
    <div :class="$style.wrapper">
        <div :class="$style.bg">

        </div>

        <a @click="appDownload" :class="$style.button">
            立即下载
        </a>
    </div>
</template>

<script>
    import apiCall from 'util/xhr'
    import platform from 'platform'
    import {MessageBox} from 'mint-ui'

    export default {
        data() {
            return {
                platformType: 'ios'
            }
        },
        created() {
            this.platformType = platform.os.family.toLocaleLowerCase();
            this.channel = this.$route.query.channel || 'intern06share'
        },
        mounted() {

        },
        methods: {
            isWechat() {
                let ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    return true;
                } else {
                    return false;
                }
            },
            appDownload() {
                apiCall.post('/channel/code', {channel: this.channel}).then((data) => {
                    let appurl = data.short || data.url
                    switch (this.platformType) {
                        case "ios":
                            window.open(appurl, "_self");
                            break;
                        case "android":
                            window.open(appurl, "_self");
                            break;
                    }
                },()=>{
                    MessageBox.alert("服务异常，请稍后再试");
                });

            }
        }
    }
</script>

<style lang="less" module>
    .wrapper {
        height: 100%;
    }

    .bg {
        background: url("../../img/download.jpg") no-repeat;
        width: 750px;
        height: 984px;
        background-size: 100% 100%;
        overflow-y: hidden;
    }

    .button {
        width: 560px;
        height: 140px;
        background: #0076FF;
        position: fixed;
        bottom: 90px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 100px;
        font-size: 40px;
        color: #FFFFFF;
        text-align: center;
        line-height: 140px;
        font-weight: lighter;
        display: block;
        text-decoration: none;
        box-shadow: 0 8px 20px 0 rgba(0, 118, 255, 0.40);

    }
</style>
