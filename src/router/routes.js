

export default [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home'),
    meta: {show:true}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: {show:false}
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register'),
    meta: {show: false}
  },
  {
    path: '/search/:keyword?',
    name: 'Search',
    component: () => import('@/views/Search'),
    meta: {show:true}
  },
  {
    path: '/detail/:skuid?',
    name: 'Detail',
    component: () => import('@/views/Detail'),
    meta: {show:true}
  },
  {
    path: '/addcartsuccess',
    name: 'AddCartSuccess',
    component:() => import('@/views/AddCartSuccess'),
    meta: {show: true}
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: () => import('@/views/ShopCart'),
    meta: {show: true}
  },
  {
    path: '/trade',
    name: 'Trade',
    component: () => import('@/views/Trade'),
    meta: {show: true},
    // 路由独享守卫
    beforeEnter(to, from, next) {
      if(from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('@/views/Pay'),
    meta: {show: true},
    beforeEnter(to, from, next) {
      if(from.path == '/trade') {
        next()
      } else {
        next(false)
      }      
    }
  },
  {
    path: '/paysuccess',
    name: 'PaySuccess',
    component: () => import('@/views/PaySuccess'),
    meta: {show: true}
  },
  {
    path: '/center',
    redirect: '/center/myorder'
  },
  {
    path: '/center',
    name: 'Center',
    component: () => import('@/views/Center'),
    meta: {show: true},
    // 二级路由
    children: [
      {
        path: 'myorder',
        name: 'MyOrder',
        component: () => import('@/views/Center/MyOrder')
      },
      {
        path: 'grouporder',
        name: 'GroupOrder',
        component: () => import('@/views/Center/GroupOrder')
      }
    ]
  }
]