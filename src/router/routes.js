// import Home from '@/pages/Home'
//路由懒加载
const Home = () => import('@/pages/Home')
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
import store from '@/store'
export default [
  {
    path: '/center',
    component: Center,
    children: [
      {
        path: 'myorder',
        component:MyOrder
      },
      {
        path: 'grouporder',
        component:GroupOrder
      },
      {
        path: '',
        redirect: 'myorder'
      }
    ]
  },
  {
    path: '/pay',
    component: Pay,
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
     beforeEnter: (to, from, next) => {
       if (from.path === '/pay') {
         next()
       } else {
         next(false)
       }
     }
  },
  {
    path: '/trade',
    component: Trade,
     beforeEnter: (to, from, next) => {
       if (from.path === '/shopcart') {
         next()
       } else {
         next(false)
       }
     }
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
     beforeEnter: (to, from, next) => {
       let skuNum = to.query.skuNum
       let skuInfo = sessionStorage.getItem('SKUINFO_KEY')
       if (skuNum && skuInfo) {
         next()
       } else {
         next('/')
       }
     }
  },
  {
    path: '/detail/:goodsId',
    component:Detail
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isHide: true
    },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      if (!store.state.user.userInfo.name) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      isHide: true
    }
  },
  {
    path: '/search/:keyword?',
    component: Search,
    name: 'search',
    // props: route => ({keyword:route.params.keyword,keyword1:route.query.keyword1})
  },
  {
    path: '/',
    redirect: '/home'
  },

]