import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api"
// home模块的小仓库
let state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}
let mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList.slice(0, 16)
  },
  GETBANNER(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
let actions = {
  async categoryList({commit}) {
    let result = await reqCategoryList()
    if(result.code == 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  // 获取首页轮播图
  async getBannerList({commit}) {
    let result = await reqGetBannerList()
    if(result.code == 200) {
      commit('GETBANNER',result.data)
    } 
  },
  async getFloorList({commit}) {
    let result = await reqFloorList()
    if(result.code == 200) {
      commit('GETFLOORLIST', result.data)
    }
  }
}
let getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}