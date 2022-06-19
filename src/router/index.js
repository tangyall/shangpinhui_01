import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

// 使用插件
Vue.use(VueRouter)

// 先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace
// 第一个参数:告诉原来的push方法往哪里跳转(传哪些参数)
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // call || apply区别
    //相同点:都可以调用函数一次,都可以篡改函数的上下文一次
    // 不同点:call与apply传递参数:call传递参数用逗号隔开;apply方法执行,传递数组
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    // call || apply区别
    //相同点:都可以调用函数一次,都可以篡改函数的上下文一次
    // 不同点:call与apply传递参数:call传递参数用逗号隔开;apply方法执行,传递数组
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

// 配置路由
let router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { y: 0 }
  }
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token
  // 用户信息
  let name = store.state.user.userInfo.name
  // 用户登陆了才会有token
  if (token) {
    // 用户已经登陆了，还想去login，则停留在首页
    if (to.path == '/login') {
      next('/home')
    } else {
      // 用户已经登陆了，但去的不是login
      if (name) {
        // 有用户信息
        next()
      } else {
        // 没有用户信息,派发action让仓库存储用户信息跳转
        try {
          // 获取用户信息成功则放行
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token失效了，获取不到用户信息，要重新登录
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录
    // 不能去支付相关的pay|paysuccess|shopcart等,个人中心
    // 去可以home|search|detail
    let toPath = to.path
    // let pass = ['/trade', '/pay', '/paysuccess', '/shopcart']
    if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1 || toPath.indexOf('/center/myorder') != -1 || toPath.indexOf('//center/grouporder') != -1 || toPath.indexOf('/shopcart') != -1 || toPath.indexOf('/addcartsuccess') != -1 || toPath.indexOf('/paysucess') != -1) {
      next('/login?redirect=' + toPath)  
    }
    next()
  }
})

export default router