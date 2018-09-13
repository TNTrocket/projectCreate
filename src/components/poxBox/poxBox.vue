<template>
    <div :class="{
           [$style.show]:isShow,
           [$style.hide]:!isShow
            }">
        <div :class="$style.mask" v-if="modalObj.mask"></div>
        <div :class="$style.toast" v-if="modalObj.type === 'toast'">{{modalObj.txt}}</div>
        <div :class="$style.loading" v-if="modalObj.type === 'loading'">
            <div :class="$style.move" v-if="!modalObj.icon"></div>
            <div :class="$style.eatBox">
                <div :class="$style.pacman" v-if="modalObj.icon==='eat'">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        <div :class="$style.alert" v-if="modalObj.type === 'alert'">
            <slot name="alert"></slot>
        </div>
        <div v-if="isAlertShow" :class="$style.alertShow">
            <div :class="$style.toast" v-if="alertMode.type === 'alertToast'">{{alertMode.txt}}</div>
            <div :class="$style.loading" v-if="alertMode.type === 'alertLoading'">
                <div :class="$style.move"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import apiCall from 'util/xhr'
    import {Component, Vue} from 'vue-property-decorator'

    interface modalObjTmp {
        type: string;
        txt?: string;
        mask?: boolean;

        [propName: string]: any;
    }

    interface alertModeTmp {
        [propName: string]: any;
    }

    @Component
    export default class poxBox extends Vue {
        isShow: boolean = false
        modalObj: modalObjTmp = {type: 'none'}
        alertMode: alertModeTmp = {}
        isAlertShow: boolean = false
        disableMove: boolean = false

        created() {
            this.$parent.$on('modal', (data) => {
                this.clear()
                this.disableMove = true
                this.$nextTick(() => {
                    this.isShow = true
                    this.modalObj = data
                    switch (this.modalObj.type) {
                        case 'toast':
                            setTimeout(() => {
                                this.clear()
                            }, 2000)
                            break
                        case 'loading':
                    }
                })
            })
            this.$parent.$on('modal:close', () => {
                this.disableMove = false
                this.clear()
            })
            this.$parent.$on('alertModal:close', () => {
//                this.disableMove = false
                this.clearAlertMode()
            })
            this.$parent.$on('alert:mode', (data) => {
                this.clearAlertMode()
                this.disableMove = true
                this.$nextTick(() => {
                    this.isAlertShow = true
                    this.alertMode = data
                    switch (this.alertMode.type) {
                        case 'alertToast':
                            setTimeout(() => {
                                this.clearAlertMode()
                            }, 2000)
                            break
                    }
                })
            })
        }

        disableTouchMove() {
            this.$nextTick(() => {
                let wapperHtml = document.querySelector(`#wapper`)
                wapperHtml.addEventListener('touchmove', (e) => {
                    if (this.disableMove) {
                        e.preventDefault()
                    }
                }, false)
            })
        }

        clearAlertMode(): void {
            this.alertMode = {}
            this.isAlertShow = false
//            this.disableMove = false
        }

        clear(): void {
            this.modalObj = {type: 'none'}
            this.isShow = false
            this.disableMove = false
        }

        mounted() {
            this.disableTouchMove()
        }
    }
</script>

<style lang="less" module>
    .show {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 97;
        background: transparent;
        top: 0;
    }

    .hide {
        display: none;
    }

    .mask {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        position: absolute;
        z-index: 98;
        top: 0;
        left: 0;
    }

    .toast {
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 10px 40px;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        text-align: center;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        z-index: 103;
        font-size: 28px;
    }

    .alert {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .alertShow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 102;
    }

    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 50px;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        text-align: center;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        z-index: 103;
        .move {
            width: 80px;
            height: 80px;
            animation: circle infinite .75s linear;
            border: 2px solid #ffffff;
            /*border-top-color: rgba(0, 0, 0, .2);*/
            border-right-color: rgba(0, 0, 0, .2);
            border-bottom-color: rgba(0, 0, 0, .2);
            border-radius: 100%;
        }
    }
    .eatBox{
        background: transparent;
        width: 50px;
        height: 50px;
    }

    @keyframes circle {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes rotate_pacman_half_up {
        0% {
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg);
        }

        50% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }

        100% {
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg);
        }
    }

    @keyframes rotate_pacman_half_up {
        0% {
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg);
        }

        50% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }

        100% {
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg);
        }
    }

    @-webkit-keyframes rotate_pacman_half_down {
        0% {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
        }

        50% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100% {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
        }
    }

    @keyframes rotate_pacman_half_down {
        0% {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
        }

        50% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100% {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
        }
    }

    @-webkit-keyframes pacman-balls {
        75% {
            opacity: 0.7;
        }

        100% {
            -webkit-transform: translate(-100px, -6.25px);
            transform: translate(-100px, -6.25px);
        }
    }

    @keyframes pacman-balls {
        75% {
            opacity: 0.7;
        }

        100% {
            -webkit-transform: translate(-100px, -6.25px);
            transform: translate(-100px, -6.25px);
        }
    }

    .pacman {
        position: absolute;
        width: 100px;
        /*display: flex;*/
        /*justify-content: center;*/
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }

    .pacman > div:nth-child(2) {
        -webkit-animation: pacman-balls 1s 0s infinite linear;
        animation: pacman-balls 1s 0s infinite linear;
    }

    .pacman > div:nth-child(3) {
        -webkit-animation: pacman-balls 1s 0.33s infinite linear;
        animation: pacman-balls 1s 0.33s infinite linear;
    }

    .pacman > div:nth-child(4) {
        -webkit-animation: pacman-balls 1s 0.66s infinite linear;
        animation: pacman-balls 1s 0.66s infinite linear;
    }

    .pacman > div:nth-child(5) {
        -webkit-animation: pacman-balls 1s 0.99s infinite linear;
        animation: pacman-balls 1s 0.99s infinite linear;
    }

    .pacman > div:first-of-type {
        width: 0px;
        height: 0px;
        border-right: 25px solid transparent;
        border-top: 25px solid #fff;
        border-left: 25px solid #fff;
        border-bottom: 25px solid #fff;
        border-radius: 25px;
        -webkit-animation: rotate_pacman_half_up 0.5s 0s infinite;
        animation: rotate_pacman_half_up 0.5s 0s infinite;
    }

    .pacman > div:nth-child(2) {
        width: 0px;
        height: 0px;
        border-right: 25px solid transparent;
        border-top: 25px solid #fff;
        border-left: 25px solid #fff;
        border-bottom: 25px solid #fff;
        border-radius: 25px;
        -webkit-animation: rotate_pacman_half_down 0.5s 0s infinite;
        animation: rotate_pacman_half_down 0.5s 0s infinite;
        margin-top: -50px;
    }

    .pacman > div:nth-child(3), .pacman > div:nth-child(4), .pacman > div:nth-child(5), .pacman > div:nth-child(6) {
        background-color: #fff;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        margin: 2px;
        width: 10px;
        height: 10px;
        position: absolute;
        -webkit-transform: translate(0, -6.25px);
        -ms-transform: translate(0, -6.25px);
        transform: translate(0, -6.25px);
        top: 25px;
        left: 100px;
    }
</style>
