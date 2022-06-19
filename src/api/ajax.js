// 对axios进行二次封装
import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

let requests = axios.create({
  // 基础路径,发起请求时,路径会出现api
  baseURL: '/api',
  // 代表请求超时的时间
  timeout: 5000
})

requests.interceptors.request.use((config) => {
  if(store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token
  }if(store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nprogress.start()
  return config
}, (error) => {
  return Promise.reject(error)
})

requests.interceptors.response.use((res) => {
  nprogress.done()
  return res.data
}, (error) => {
  return Promise.reject(error)
})

// 对外暴露
export default requests