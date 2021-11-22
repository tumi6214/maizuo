import axios from 'axios'
import { Toast } from "vant"

const http = axios.create({
    baseURL: 'https://m.maizuo.com',
    timeout: 10000,
    headers: {
        "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1629449388202640851992577","bc":"440300"}'
    }
});

// 请求前拦截
http.interceptors.request.use(function (config) {
    // 显示一个loading
    Toast.loading({
        message: "加载中...",
        forbidClick: true,
        overlay: true,
    });

    return config
}, function (error) {
    return Promise.reject(error)
})

// 请求后拦截
http.interceptors.response.use(function (response) {
    Toast.clear();

    return response
}, function (error) {
    return Promise.reject(error)
})

export default http