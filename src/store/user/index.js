import {reqGetCode, reqUserRegister, reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import {getToken, setToken, removeToken} from '@/utils/token'

const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEARUSERINFO(state) {
    state.token = ''
    state.userInfo = {}
    removeToken()
  }
}
const actions = {
  // 获取验证码
  async getCode({commit}, phone) {
    let result = await reqGetCode(phone)
    if(result.code == 200) {
      commit('GETCODE', result.data)
      return 'ok'
    }else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async userRegister({commit}, user) {
    let result = await reqUserRegister(user)
    if(result.code) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 登录业务
  async userLigin({commit}, data) {
    let result = await reqUserLogin(data)
    if(result.code == 200) {
      setToken(result.data.token)
      commit('USERLOGIN', result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo({commit}) {
    let result = await reqUserInfo()
    if(result.code == 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async userLogout({commit}) {
    let result = await reqLogout()
    if(result.code == 200) {
      commit('CLEARUSERINFO')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}