import axios from 'axios';
import qs from 'qs';


axios.defaults.baseURL = '/wechat-api';
axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.headers.common['Pragma'] = 'no-cache';
let isShowIngError = false;
axios.interceptors.response.use(function ({data, config, status}) {
    // Do something with response data
    if (status === 200) {
        if (data.result === 10000) {
            return Promise.resolve(data.data);
        }else {
            if (config.ignoreErrorModal) {
                return Promise.reject(data);
            } else {
                return Promise.reject(data.msg);
            }
        }
    } else {
        return Promise.reject(data);
    }
}, function (error) {
    if (!isShowIngError) {
        isShowIngError = true;
    }
    if(error.response.status === 404){
        error = 404
    }
    return Promise.reject(error);
});

export default {
    get(url, params = {}, config = {}) {
        return axios({
            method: 'get',
            url,
            params,
            ignoreErrorModal: config.ignoreErrorModal || false,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    },
    post(url, data, config = {}) {
        return axios({
            method: 'post',
            url: url,
            data: qs.stringify(data,{arrayFormat: 'brackets'}),
            ignoreErrorModal: config.ignoreErrorModal || false,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
    },
    upload(url, formData, config) {
        return axios.post(url, formData, config);
    }
}