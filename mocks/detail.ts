import Mock from 'mockjs'
Mock.mock(/wechat-api\/mk\/award\/getActivity/, 'post', function (options) {
    return Mock.mock({
            'result': 10000,
            'msg': 'ok',
            'data': {
                 id: 123,
                 content: '123456',
                'giftList|3': [{
                    giftTitle: '啊啊啊',
                    giftUrl: 'https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/gitColorBg.png',
                    giftPrize: 120,
                    giftDes: 'eff',
                    giftId: '@id'
                }]
            }
        }
    )
})

Mock.mock(/wechat-api\/mk\/nine\/sales\/getDeposit/, 'post', function (options) {
    return Mock.mock({
            'result': 10000,
            'msg': 'ok',
            'data': {
                "depositState":"",
                "depositAmount":123,
                "depositNo":"",
                "purpose":"ggg",
                 mobile: '12345'
            }
        }
    )
})
Mock.mock(/wechat-api\/sms\/getSmsCheckCode/, 'post', function (options) {
    return Mock.mock({
            'result': 10000,
            'msg': 'ok',
            'data': {
            }
        }
    )
})
Mock.mock(/wechat-api\/mk\/nine\/sales\/authPhoneBySms/, 'post', function (options) {
    return Mock.mock({
            'result': 10000,
            'msg': 'ok',
            'data': {
            }
        }
    )
})
Mock.mock(/wechat-api\/mk\/nine\/sales\/createDeposit/, 'post', function (options) {
    return Mock.mock({
            'result': 10000,
            'msg': 'ok',
            'data': {
                "depositNo":"",
                "url":""
            }
        }
    )
})