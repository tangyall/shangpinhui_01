import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/mock/mockServe'
import store from './store'
// 三级联动组件--全局组件
import TyoeNav from '@/components/TypeNav'
import 'swiper/css/swiper.css'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/pagination'
import { Button,MessageBox,Message } from 'element-ui';

// 统一接收api文件夹里面的全部请求
import * as API from '@/api'
import VueLazyload from 'vue-lazyload'
import dog from '@/assets/狗.jpg'
// 引入表单验证插件
import '@/plugins/validate'

// 第一个参数:全局组件的名字;第二个参数:哪一个组件
Vue.component(TyoeNav.name, TyoeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = Message

Vue.use(VueLazyload,{
  loading: dog
})

Vue.config.silent = true

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 路由注册
  router,
  store
}).$mount('#app')
