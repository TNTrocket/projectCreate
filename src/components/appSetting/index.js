function isH5APP() {
    let ua = navigator.userAgent.toUpperCase();
    if (ua.match(/IOS_QBANK/i) == "IOS_QBANK") {
        return 'iosApp';
    } else if (ua.match(/ANDROID_QBANK/i) == "ANDROID_QBANK") {
        return 'androidApp';
    }
}


let appSetting = {
    isH5APP:isH5APP()
}

export default appSetting