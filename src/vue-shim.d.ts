declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}
declare module 'vue/types/vue' {
    interface Vue {
        $on: any;
        $emit: any;
    }
}
declare var MtaH5: any;