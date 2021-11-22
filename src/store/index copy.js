import Vue from 'vue'
import Vuex from 'vuex'
import http from "@/util/http";

Vue.use(Vuex)

// store "全局"的对象
export default new Vuex.Store({
  state: {
    cityId: "310100",
    cityName: "上海",
    isTabbarShow: true,

    cinemaList: []
  },
  // 集中式修改状态 - 被监控了？？？
  mutations: {
    changeCityId(state, id) {
      state.cityId = id
    },
    changeCityName(state, name) {
      state.cityName = name
    },
    changeTabbarShow(state, bool) {
      state.isTabbarShow = bool
    },
    setCinemaList(state, cinemaList) {
      state.cinemaList = cinemaList
    },
    clearCinemaList(state) {
      state.cinemaList = []
    }
  },
  // 异步
  actions: {
    getCinemaList(store, cityId) {
      return http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=1754683`,
        headers: {
          "X-Host": "mall.film-ticket.cinema.list",
        },
      }).then((res) => {
        console.log(res.data);
        store.commit("setCinemaList", res.data.data.cinemas)
      });
    }
  }
})

// store 只是存在内存中
// store 配置持久化

