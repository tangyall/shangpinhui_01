import {reqCartList, reqDeleteCartById, reqUpdateCheckedById} from '@/api'

const state = {
  cartList: []
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  async getCartList({commit}) {
    // 测试是否能获取购物车数据
    let result = await reqCartList()
    if(result.code == 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  async deleteCartListBySkuId({commit}, skuId) {
    let result = await reqDeleteCartById(skuId)
    if(result.code) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 修改购物车某个产品的选中状态
  async updateCheckedById({commit}, {skuId, isChecked}) {
    let result = await reqUpdateCheckedById(skuId, isChecked)
    if(result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除全部选中的产品
  deleteAllCheckedCart({dispatch, getters}) {
    let promiseAll = []
    // 获取购物车中的全部产品
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId',item.skuId): ''
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  },
  // 修改全部产品的选中状态
  updateAllCartIsChecked({dispatch, state}, isChecked) {
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch('updateCheckedById', {skuId: item.skuId, isChecked})
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}