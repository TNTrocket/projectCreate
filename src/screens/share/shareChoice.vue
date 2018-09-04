<template>
    <div :class="$style.bgColor">
        <div :class="$style.topBg">
            <div :class="$style.logo"></div>
        </div>
        <div :class="$style.middleBg">
          <div :class="$style.questionContent">
              <div :class="$style.questionTitle"></div>
              <div :class="$style.singleContent" v-html="content"></div>
              <ul :class="$style.choice">
                  <li v-for="(item, index) in chooseOption">
                      <div :class="$style.icon">{{item.optionTitle}}</div>
                      <div v-html="item.content" :class="$style.optionTxt"></div>
                  </li>
              </ul>
              <div :class="$style.questionStatus">
                  <div :class="$style.percent">
                      <div :class="$style.header">
                          <div :class="$style.statusIcon"></div>
                          <div :class="$style.txt">本题正确率</div>
                          <div :class="$style.statusIcon"></div>
                      </div>
                      <div :class="$style.footer">
                          <span :class="$style.percentTxt">{{correctRate}}</span>%
                      </div>
                  </div>
                  <div :class="$style.starBox">
                      <div :class="$style.header">
                          <div :class="$style.statusIcon"></div>
                          <div :class="$style.txt">难度星级</div>
                          <div :class="$style.statusIcon"></div>
                      </div>
                      <div :class="$style.footer">
                          <span :class="{
                              [$style.star]:item.star,
                              [$style.noStar]:!item.star
                      }" v-for="(item, index) in starList"></span>
                      </div>
                  </div>
              </div>
              <div :class="$style.footerBtn">
                  不服来战
              </div>
          </div>
        </div>
        <div :class="$style.scfooterBg">
            <div :class="$style.desk"></div>
            <div :class="$style.scQrcode">
                <div :class="$style.scQrcodeBg">
                    <qrcode-vue :value="codeUrl" :size="codeSize" :className="$style.codeSize" level="L"></qrcode-vue>
                </div>
                <div :class="$style.scQrcodeTxt">长按了解APP</div>
            </div>
            <div :class="$style.footerTips"></div>
        </div>
    </div>
</template>

<script>
    import apiCall from 'util/xhr'
    import {MessageBox} from 'mint-ui';
    import QrcodeVue from 'qrcode.vue';
    import appSetting from 'components/appSetting/index'

//    let deviceWidth = document.documentElement.clientWidth;
//    let ratio = deviceWidth / 750

    export default {
        data() {
            return {
                type: '',
                contentArray: [],
                content: "",
                typeName: '',
                chooseOption: [],
                scrollHeight: "",
                correctRate: '',
                starList: [],
                codeSize: 50,
                codeUrl: '',
                channel: ''
            }
        },
        components: {
            QrcodeVue: QrcodeVue
        },
        created() {
            let {questionId = 0} = this.$route.query;
            let appType = appSetting.isH5APP;
            if (appType === 'iosApp') {
                this.channel = 'ios'
//                try {
//                    window.qbank.getToken((data) => {
//                        this.token = data.token;
//                    });
//                } catch (e) {
//
//                }
            } else if (appType === 'androidApp') {
                try {
//                    this.token = window.qbank.getToken();
                    this.channel = window.qbank.getChannel();
                } catch (e) {

                }
            }
            apiCall.post('/channel/code', {channel: this.channel}).then(((data) => {
                this.codeUrl = data.shortUrl || data.url
            }))
            apiCall.get(`/share/question/${questionId}`).then((data) => {
                this.type = data.type;
                this.content = data.content;
                this.chooseOption = data.options || [];
                this.contentArray = data.children || [];
                this.correctRate = data.correctRate || ''
                if(data.difficulty){
                    let i = 0
                    while(i < data.difficulty){
                        i++;
                        this.starList.push({
                            star:true
                        })
                    }
                    while (i < 5){
                        i++;
                        this.starList.push({
                            star:false
                        })
                    }
                }
            }, (status) => {
                if (status === 404) {
                    MessageBox("提示", "请确认网络是否正常")
                } else {
                    MessageBox("提示", status)
                }
            })
        },
        mounted() {

        }
    }
</script>

<style lang="less" module>
    .bgColor{
        height: 100%;
        background: #EFEFF4;
    }
    .logo{
        background: url('../../img/scLogo.png');
        width: 574px;
        height: 168px;
        margin: 0 auto 0 auto ;
        background-size: 100% 100%;
    }
    .topBg{
        background: url('../../img/scHeader.png');
        width: 750px;
        height: 260px;
        background-size: 100% 100%;
        padding-top: 80px;
    }
    .middleBg{
        background: linear-gradient(to bottom, #6D63FB, #385FF6);
        width: 750px;
        height: auto;
        padding-top: 60px;
        min-height: 660px;
    }
    .questionContent{
        width: 600px;
        margin: 0 auto 0 auto;
        background: #FFFFFF;
        box-shadow: 0 20px 40px 0 rgba(67,36,129,0.40);
        border-radius: 32px;
        padding: 40px 40px 104px 40px;
        position: relative;
        z-index: 8;
    }
    .singleContent {
        color: #323744;
        line-height: 60px;
        word-break: break-all;
        font-size: 32px;
        padding: 30px 0 50px 0;
        img{
            max-width: 100%!important;
        }
        p:empty{
            margin-bottom: 40px;
        }
        ol{
            margin: 0 30px;
        }
    }
    .choice {
        list-style: none;
        font-size: 32px;
        li {
            margin-bottom: 50px;
            display: flex;
        }
    }

    .icon {
        flex: none;
        margin-right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        line-height: 60px;
        background: #B4BCC8;
    }

    .optionTxt {
        flex: 1;
        display: flex;
        align-items: center;
        word-break: break-all;
    }
    .questionTitle{
        background: url('../../img/scTitle.png');
        width: 108px;
        height: 40px;
        background-size: 100% 100%;
    }
    .questionStatus{
        margin-top: 100px;
        display: flex;
        justify-content: space-between;
        .txt{
            padding: 0 10px;
        }
        .percentTxt{
            font-size: 52px;
            color: #323744;
        }
        .footer{
            font-size: 32px;
            color: #141900;
            text-align: center;
        }
        .statusIcon{
            background: url('../../img/scStatusIcon.png');
            width: 28px;
            height: 28px;
            background-size: 100% 100%;
        }
        .percent{
          .header{
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 28px;
              color: #323744;
          }
      }
        .starBox{
            .header{
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 28px;
                color: #323744;
            }
            .footer{
                display: flex;
                justify-content: center;
                margin-top: 22px;
            }
            .star{
                background: url('../../img/Star1.png');
                width: 32px;
                height: 32px;
                background-size: 100% 100%;
                margin-right: 14px;
            }
            .noStar{
                background: url('../../img/Star2.png');
                width: 32px;
                height: 32px;
                background-size: 100% 100%;
                margin-right: 14px;
            }
        }
    }
    .footerBtn{
        background: url('../../img/scfooterBtn.png');
        width: 600px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 32px;
        color: #FFFFFF;
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 0 0 32px 32px;
        z-index: 9;
    }
    .scfooterBg{
        background: url('../../img/scfooterBg.png');
        width: 750px;
        height: 428px;
        background-size: contain;
        position: relative;
        z-index: 6;
        top: -120px;
        .desk{
            background: url('../../img/desk.png');
            width: 750px;
            height: 514px;
            background-size: 100% 100%;
            z-index: 7;
            top: -88px;
            left: 0;
            position: absolute;
        }
        .scQrcode{
            /*background: url('../../img/scQrcode.png');*/
            /*width: 180px;*/
            /*height: 180px;*/
            /*background-size: 100% 100%;*/
            z-index: 9;
            position: absolute;
            bottom: 36px;
            left: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .scQrcodeBg{
                background: #fff;
                /*width: 170px;*/
                /*height: 170px;*/
                width: 60px;/*no*/
                height: 60px;/*no*/
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 8px;
            }
            .codeSize{
                width: 50px;/*no*/
                height: 50px;/*no*/
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .scQrcodeTxt{
                margin-top: 10px;
                text-align: center;
                font-size: 26px;
                color: #FFFFFF;
                letter-spacing: 0.5px;/*no*/
                text-shadow: 0 4px 16px rgba(75,33,135,0.50);
            }
        }
        .footerTips{
            background: url('../../img/scfooterTip.png');
            width: 522px;
            height: 150px;
            background-size: 100% 100%;
            z-index: 9;
            position: absolute;
            bottom: 70px;
            right: 10px;
        }
    }
</style>
