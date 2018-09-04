<template>
    <div :class="$style.bgColor">
        <div :class="$style.warpper">
            <div :class="$style.content">
                <div :class="$style.title">{{title}}</div>
                <div :class="$style.description" v-html="content"></div>
            </div>
        </div>
        <footerDownload></footerDownload>
    </div>
</template>

<script>
    import apiCall from 'util/xhr'
    import {MessageBox} from 'mint-ui';
    import footerDownload from 'components/footerDownload/index'

    export default {
        data() {
            return {
                content: '',
                title:''
            }
        },
        created() {
            let {rehearseId} = this.$route.query;
            apiCall.get(`/share/rehearse/${rehearseId}`).then((data) => {
                this.title = data.title;
                this.content = data.content;
            }, (status) => {
                if (status === 404) {
                    MessageBox("提示", "请确认网络是否正常")
                } else {
                    MessageBox("提示", status)
                }
            })
        },
        mounted() {

        },
        components: {
            footerDownload: footerDownload
        }
    }
</script>

<style lang="less" module>
    .warpper {
        background: #EFEFF4;
        overflow-y: scroll;
        padding-bottom: 160px;
        color: #323744;
    }
    .bgColor{
        height: 100%;
        background: #EFEFF4;
    }
    .header{
        height: 90px;
        background: #fff;
        line-height: 90px;
        padding-left: 30px;
        color: #0076ff;
        font-size: 30px;
    }
    .content{
        padding: 40px 30px;
    }
    .title{
        line-height: 48px;
        font-size: 34px;
        color: #323744;
        letter-spacing: 1px;
        font-weight: bold;
    }
    .description{
        line-height: 56px;
        font-size: 32px;
        color: #323744;
        letter-spacing: 1px;
        margin-top: 20px;
    }
</style>
