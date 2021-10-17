import axios from 'axios'
import store from '@/store'
import router from '@/router'

export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'

const instance = axios.create({
  baseURL
})

// 请求拦截器
instance.interceptors.request.use(config => {
  const token = store.state.user.profile.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => {
  return res.data
}, err => {
  if (err.response && err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})

// 封装一个通用的方法
export default (options) => {
  return instance({
    method: options.method,
    url: options.url,
    [options.method.toUpperCase() === 'GET' ? 'params' : 'data']: options.data
  })
}

/**
 * import request from 'request'
 * request({
 *  method:'GET',
 *  url:'',
 *  data
 * })
 */
