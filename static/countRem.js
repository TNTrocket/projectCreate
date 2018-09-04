var self = this
var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
if (deviceWidth > 750) {
    deviceWidth = 750;
}
document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
if(!deviceWidth){
    self.timer = setInterval(function () {
        deviceWidth = document.documentElement.clientWidth || window.innerWidth;
        if (deviceWidth) {
            clearInterval(self.timer)
        }
        if (deviceWidth > 750) {
            deviceWidth = 750;
        }
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    }, 50)
}

