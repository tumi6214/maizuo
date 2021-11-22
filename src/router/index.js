import Vue from 'vue'
import VueRouter from 'vue-router'
import Film from '../views/Film.vue'
import Cinema from '../views/Cinema.vue'
// import Center from '../views/Center.vue'
import Detail from '../views/Detail.vue'
// import Login from '../views/Login.vue'
import City from '../views/City.vue'
import Search from '../views/Search.vue'

import Nowplaying from '../views/film/Nowplaying.vue'
import Comingsoon from '../views/film/Comingsoon.vue'

Vue.use(VueRouter)  //注册模块

const routes = [
  {
    path: "/film",
    component: Film,
    // 嵌套路由
    children: [
      {
        path: "nowplaying", // 简写
        component: Nowplaying
      },
      {
        path: "/film/comingsoon",
        component: Comingsoon
      },
      {
        path: "",
        redirect: "/film/nowplaying"
      }
    ]
  },
  {
    path: "/cinema",
    component: Cinema
  },
  {
    path: "/cinema/search",
    component: Search
  },
  {
    path: "/center",
    // 路由懒加载
    component: () => import('../views/Center.vue')
  },
  {
    path: "/login",
    component: () => import('../views/Login.vue')
  },
  {
    path: "/detail/:myid",  // 动态路由
    component: Detail,
    name: "kerwinDetail"
  },
  {
    path: "/detail",
    component: Detail
  },
  {
    path: "/city",
    component: City
  },
  {
    path: '*',  // 通配符
    redirect: "/film"
  }
]

const router = new VueRouter({
  mode: "hash", // 路由模式
  routes
})

// 全局路由守卫
// router.beforeEach((to, from, next) => {
//   let auth = ['/center', '/order', 'money', 'card']

//   if (auth.includes(to.fullPath)) {
//     // console.log('验证token');
//     if (!localStorage.getItem("token")) {
//       next('/login');
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
