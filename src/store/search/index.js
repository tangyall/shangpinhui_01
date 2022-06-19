// search模块的小仓库
import { reqGetSearchInfo } from '@/api'
let state = {
  searchList: {}
}
let mutations = {
  GETSEARCHLIST(state,searchList) {
    state.searchList = searchList
  }
}
let actions = {
  async getSearchList({commit}, params) {
    let result = await reqGetSearchInfo(params)
    if(result.code == 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}
// 简化数据
let getters = {
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}