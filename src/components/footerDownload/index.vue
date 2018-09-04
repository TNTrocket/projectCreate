<template>
    <div>
        <div :class="$style.footer">
            <div :class="$style.logo">
                <img src="./logo@2x.png"/>
            </div>
            <div :class="$style.txtBox">
                <p :class="$style.txtTitle">{{txtTitle}}</p>
                <p :class="$style.txtTips">{{txtTips}}</p>
            </div>
            <div :class="$style.download">
                <router-link :to="{ path: 'download', query: {channel: channel} }">
                    立即下载
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            showType: {
                type:String,
                default: ""
            }
        },
        data() {
            return {
                txtTitle: "欲知答案如何",
                txtTips: "打开\"伴你考教师\"",
                channel: ''
            }
        },
        created(){
            this.channel = this.$route.query.channel || ''
            if(this.showType === "news"){
              this.txtTitle = "伴你考老师";
              this.txtTips = "轻松高效 get 教师资格证";
            }
        }
    }
</script>

<style lang="less" module>
    .footer {
        box-shadow: 0 -4px 8px 0 rgba(50,55,68,0.15);
        position: fixed;
        width: 750px;
        height: 140px;
        bottom: 0;
        padding: 0 36px;
        font-size: 28px;
        display: flex;
        z-index: 999;
        background: #fff;
        align-items: center;
        .logo {
            margin-top: 10px;
            img {
                width: 110px;
                height: 110px;
            }
        }
        .txtBox {
            margin-left: 10px;
        }
        .download {
            font-size: 36px;
            position: absolute;
            right: 30px;
            top:50%;
            transform: translateY(-50%);
            /*margin-left: 140px;*/
            width: 220px;
            height: 84px;
            line-height: 84px;
            background: #0076FF;
            border-radius: 62px;
            text-align: center;
            color: #fff;
            font-weight: lighter;
            a{
                text-decoration: none;
                color: #fff;
                display: block;
            }
        }
        .txtTitle{
            font-size: 36px;
            color: #323744;
        }
        .txtTips{
            color: #7D879B;
        }
    }
</style>
