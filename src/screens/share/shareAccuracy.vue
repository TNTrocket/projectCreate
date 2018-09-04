<template>
    <div :class="$style.wrapper">
        <div :class="$style.headerBg">
            <div :class="$style.title">
                <span :class="[$style.icon,$style.left]"></span>
                <span>正在伴你考《教师资格认证》学习</span>
                <span :class="$style.icon"></span>
            </div>
            <div :class="$style.showData">
                <div :class="$style.item">
                    <p :class="$style.data">{{practiceDays}}天</p>
                    <p>坚持天数</p>
                </div>
                <div :class="$style.item">
                    <p :class="$style.data">{{answerCount}}</p>
                    <p>累计答题</p>
                </div>
                <div :class="$style.item">
                    <p :class="$style.data">{{noteCount}}条</p>
                    <p>学习笔记</p>
                </div>
            </div>
            <div :class="$style.brokenLineTxt">最近7天正确率</div>
            <div :class="$style.brokenLine">
                <chart :options="option" auto-resize watchShallow></chart>
            </div>
        </div>
        <div :class="$style.footerBg">
            <div :class="$style.footerTxt">
                <div :class="$style.txt1">{{motto1}}</div>
                <div :class="$style.txt2">{{motto2}}</div>
            </div>
            <div :class="$style.footerCode">
                <div :class="$style.codeTxt">
                    <p :class="$style.codeTxt1">长按识别二维码了解</p>
                    <p :class="$style.codeTxt2">伴你考教师</p>
                </div>
                <div :class="$style.qrCode">
                    <qrcode-vue :value="codeUrl" :size="codeSize" level="L"></qrcode-vue>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import apiCall from 'util/xhr'
    import platform from 'platform'
    import {MessageBox} from 'mint-ui'
    import QrcodeVue from 'qrcode.vue';
    import moment from 'moment'
    import appSetting from 'components/appSetting/index'

//    let deviceWidth = document.documentElement.clientWidth;
//    let ratio = deviceWidth / 750
    export default {
        data() {
            return {
                practiceDays: '',
                answerCount: '',
                noteCount: '',
                option: {},
                codeUrl: '',
                codeSize: 50,
                motto1: '',
                motto2: ''
            }
        },
        created() {
            let appType = appSetting.isH5APP;
            if (appType === 'iosApp') {
                this.channel = 'ios'
                try {
                    window.qbank.getToken((data) => {
                        this.token = data.token;
                        this.initData()
                    });
                } catch (e) {

                }
            } else if (appType === 'androidApp') {
                try {
                    this.token = window.qbank.getToken();
                    this.channel = window.qbank.getChannel();
                    this.initData()
                } catch (e) {

                }
            }
            let radomTxt = [
                {
                    text1: '你认为你行，你就行。',
                    text2: 'You think you can, you can'
                },
                {
                    text1: '活着，为了学习。',
                    text2: 'Learn and live'
                },
                {
                    text1: '人不可貌相，海不可斗量。',
                    text2: 'Judge not from appearances'
                },
                {
                    text1: '天生我才必有用。',
                    text2: 'All things in their being are good for something'
                },
                {
                    text1: '一次只做一件事，做到最好！',
                    text2: 'Do one thing at a time, and do well'
                },
                {
                    text1: '先学走，再学跑。',
                    text2: 'Learn to walk before you run'
                },
                {
                    text1: '勇往直前， 决不放弃！',
                    text2: 'Keep on going never give up'
                },
                {
                    text1: '人生短暂，学术无涯。',
                    text2: 'Life is short and art is long'
                },
                {
                    text1: '锲而不舍，金石可镂。',
                    text2: 'Constant dripping wears away the stone'
                },
                {
                    text1: '一次只做一件事，做到最好！',
                    text2: 'Do one thing at a time, and do well'
                },
                {
                    text1: '我行，因为我相信我行。',
                    text2: 'I can because i think i can'
                },
                {
                    text1: '行动胜于言语！',
                    text2: 'Action speak louder than words'
                },
                {
                    text1: '今日事今日毕！',
                    text2: 'Never put off what you can do today until tomorrow'
                },
                {
                    text1: '夜最黑时，黎明最近。',
                    text2: 'When the night is darkest, dawn is nearest'
                },
                {
                    text1: '心之所愿，无所不成。',
                    text2: 'Nothing is impossible for a willing heart'
                },
                {
                    text1: '博学使人谦逊，无知使人骄傲',
                    text2: 'Knowledge makes humble, ignorance makes proud.'
                }
            ]
            let radomIndex = radomTxt[parseInt(Math.random() * radomTxt.length)]
            this.motto1 = radomIndex.text1
            this.motto2 = radomIndex.text2
        },
        mounted() {

        },
        components: {
            QrcodeVue: QrcodeVue
        },
        methods: {
            initData() {
                apiCall.get('/report/v2.3/data', {token: this.token}).then(((data) => {
                    this.practiceDays = data.practiceDays
                    this.answerCount = data.answerCount
                    this.noteCount = data.noteCount
                    let correctArray = data.correctArray
                    let dateMap = correctArray.map((item) => {
                        if (moment(parseInt(item.date)).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
                            return '今天'
                        } else {
                            return moment(parseInt(item.date)).format('MM.DD')
                        }

                    })
                    let dataMap = correctArray.map((item) => {
                        return parseInt(item.rate)
                    })
                    this.option = {
                        grid: {
                            left: 0,
                            top: 20,
                            right: 0,
                            bottom: 20
                        },
                        xAxis: {
                            type: 'category',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
//                            show: false,
                                length: 0
                            },
                            axisLabel: {
                                color: '#fff',
                                fontSize: 10
                            },
                            data: dateMap,
                            splitNumber: 5
                        },
                        yAxis: {
                            type: 'value',
                            show: false
                        },
                        series: [{
                            data: dataMap,
                            type: 'line',
                            animation: false,
                            smooth: true,
                            color: '#fff',
                            label: {
                                show: true,
                                formatter: '{c}%',
                                fontSize: 10
                            },
                            areaStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(255, 255, 255, 0.8)'
                                        },
                                        {
                                            offset: 0.5, color: 'rgba(255, 255, 255, 0)'
                                        },
                                        {
                                            offset: 1, color: 'rgba(255, 255, 255, 0)'
                                        }],
                                    globalCoord: false // 缺省为 false
                                }
                            }
                        }]
                    }
                }))

                apiCall.post('/channel/code', {channel: this.channel}).then(((data) => {
                    this.codeUrl = data.shortUrl || data.url
                }))
            },
        }
    }
</script>

<style lang="less" module>
    .wrapper {
        /*height: 100%;*/
        background: #fff;
    }

    .headerBg {
        text-align: center;
        padding: 110px 40px 0 40px;
        background: url('../../img/saHeaderBg.png') no-repeat;
        background-size: 100% 100%;
        width: 750px;
        height: 884px;
        .title {
            font-size: 34px;
            color: #FFFFFF;
            /*white-space: nowrap;*/
            line-height: 1;
            display: flex;
            justify-content: space-between;
        }
        .icon {
            background: url('../../img/titleTopTxt.png');
            width: 54px;
            height: 30px;
            background-size: 100% 100%;
            /*display: inline-block;*/
            /*vertical-align: baseline;*/
        }
        .left {
            transform: rotateY(180deg);
        }
    }

    .showData {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 62px;
        padding-bottom: 64px;
        border-bottom: 1px solid #fff; /*no*/
        .item {
            flex: 1
        }
        p {
            font-size: 28px;
            line-height: 1;
            color: #FFFFFF;
            &.data {
                font-size: 44px;
                margin-bottom: 6px;
            }
        }
    }

    .brokenLineTxt {
        font-size: 28px;
        color: #FFFFFF;
        margin-top: 60px;
        text-align: left;
    }

    :global {
        .echarts {
            width: 618px !important;
            height: 300px !important;
            margin: 0 auto;
        }
    }

    .footerBg {
        background: url('../../img/footerBg.png');
        width: 750px;
        height: 450px;
        background-size: 100% 100%;
        position: relative;
        text-align: center;
        .txt1 {
            /*margin-top: 100px;*/
            font-size: 44px;
            color: #404E6F;
            padding: 0 40px;
            line-height: 1;
            text-align: center;
        }
        .txt2 {
            font-size: 24px;
            color: #404E6F;
            margin-top: 22px;
            padding: 0 40px;
            line-height: 1;
            text-align: center;
        }
        .footerTxt{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top:100px;
            width: 100%;
        }
    }

    .footerCode {
        /*margin-top: 124px;*/
        position: absolute;
        bottom: 70px;
        display: flex;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        justify-content: center;
        align-items: center;
        .codeTxt1 {
            font-size: 22px;
            color: #404E6F;
            line-height: 1;
        }
        .codeTxt2 {
            font-size: 36px;
            color: #404E6F;
            letter-spacing: 10px;
            margin-top: 10px;
            line-height: 1;
        }
        .qrCode {
            position: relative;
            top: 6px;
            left: 18px;
        }
    }
</style>
