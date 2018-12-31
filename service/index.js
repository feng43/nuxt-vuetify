import axios from 'axios'
import qs from 'qs'
import config from './config'

const service = axios.create(config)

// 请求拦截器
service.interceptors.request.use(
    config => {
        console.log(config)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// 返回拦截器
service.interceptors.response.use(
    res => {
        return res.data
    },
    error => {
        return Promise.reject(error)
    }
)

export default {
    // post 方法
    post(url, data) {
        return service({
            method: 'post',
            url,
            // params: data
            data: data
        })
    },
    // get 方法
    get(url, data) {
        return service({
            method: 'get',
            url,
            params: data
        })
    }
    // delete 方法
    // delete(url, data) {
    //     return service({
    //         methods: 'delete',
    //         url,
    //         params: data
    //     })
    // }
}
