import axios from 'axios'
import { ElLoading } from 'element-plus'
import Message from '@/utils/Message'
import store from '@/store';

const contentTypeForm = "application/x-www-form-urlencoded;charset=UTF-8";
const contentTypeJson = "application/json";


const instance = axios.create({
    baseURL: "/api",
    timeout: 30 * 1000,
})

//请求前过滤器
let loading = null;
instance.interceptors.request.use(
    (config) => {
        if (config.showLoading) {
            loading = ElLoading.service({
                lock: true,
                text: "加载中......",
                background: 'rgba(0,0,0,0.7)'
            })
        }
        console.log("store" + store.state)
        if(store.state.uuid_token){
            //请求头添加一个字段uuid
            config.headers.uuid = store.state.uuid_token
        }
        return config;
    }, (error) => {
        if (config.showLoading && loading) {
            loading.close();
        }
        Message.error("请求发送失败");
        return Promise.reject("请求发送失败");
    }
);

//请求后过滤器
instance.interceptors.response.use(
    (response) => {
        const {showLoading, errorCallback, showError} = response.config;
        if (showLoading && loading) {
            loading.close();
        }
        const responseData = response.data;
        if (responseData.code == 200 || responseData.code == 250) {
            return responseData.code;
        } else {
            if (errorCallback) {
                errorCallback(responseData)
            }
            return Promise.reject({showError: showError, msg: responseData.data})
        }
    }, (error) => {
        if (error.config.showLoading && loading) {
            loading.close();
        }
        return Promise.reject({showError: true, msg: "网络异常"})
    }
);

const request = (config) => {
    const {url, params, dataType, showLoading = true, errorCallback, showError = true} = config
    let contentType = contentTypeForm;
    let formData = new FormData();
    for (let key in params) {
        formData.append(key, params[key] == undefined ? "" : params[key]);
    }
    if (dataType != null && dataType === "json") {
        contentType = contentTypeJson;
    }
    let headers = {
        'Content-Type': contentType,
        'X-Requested-With': 'XMLHttpRequest',
    }
    return instance.post(url, formData, {
        headers: headers,
        showLoading: showLoading,
        errorCallback: errorCallback,
        showError: showError
    }).catch(error => {
        if (error.showError) {
            Message.error(error.msg);
        }
        return null;
    })
}

export default request;