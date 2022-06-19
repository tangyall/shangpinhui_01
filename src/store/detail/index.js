import {reqGoodsInfo, reqAddOrUpdateShopCart} from '@/api'
// 封装一个游客身份的uuid---生成一个随机的字符串且不能变
import {getUUID} from '@/utils/uuid_token'

const state = {
  goodInfo: {},
  uuid_token: getUUID()
}
const mutations = {
  GETGOODSINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
const actions = {
  // 获取产品信息
  async getGoodsInfo({commit}, skuId) {
    let result = await reqGoodsInfo(skuId)
    if(result.code == 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart({commit}, {skuId, skuNum}) {
    // 加入购物车返回的结果
    let result = await reqAddOrUpdateShopCart(skuId,skuNum)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  // 产品的售卖属性
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}