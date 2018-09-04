<template>
    <div :class="$style.wrapper">
        <div :class="$style.title">
            {{title}}
        </div>
        <div :class="$style.tipsBox">
            <div v-if="source" :class="$style.from">来源:</div>
            <div :class="$style.source" v-if="source">{{source}}</div>
            <div>{{publishTime}}</div>
        </div>
        <article v-html="article" :class="$style.article"></article>
    </div>
</template>

<script>
    import  apiCall from 'util/xhr'
    import { MessageBox } from 'mint-ui';
    export default {
        data(){
            return {
                title: "",
                source:"",
                publishTime:"",
                article:""
            }
        },
        created() {

        },
        mounted(){
            let {infoId=0} = this.$route.query;
            apiCall.get(`/information/${infoId}/detail`).then(({title, source, publishTime, body})=>{
                this.title = title;
                this.source = source;
                this.publishTime = publishTime;
                this.article = body;
                document.title = this.title;
            },(status)=>{
                if(status === 404){
                    MessageBox("提示", "请确认网络是否正常")
                }else{
                    MessageBox("提示", status)
                }
            });
        }
    }
</script>

<style lang="less" module>
    .wrapper {
        padding: 76px 36px 160px 36px;
    }

    .title {
        font-size: 48px;
        color: #323744;
        text-align: justify;
        font-weight: bolder;
    }
    .tipsBox{
        margin-top: 20px;
        color: #7D879B;
        font-size: 26px;
        >div{
            display: inline-block;
            vertical-align: middle;
            margin-right: 30px;
        }
        .source{
            color: #0076FF;
        }
        .from{
            margin: 0;
        }
    }
    .article{
        margin-top: 60px;
        line-height: 60px;
        word-break: break-all;
        font-size: 32px;
        letter-spacing: 0;
        color: #323744;
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
</style>
