<template>
  <div>
    <tabbar v-show="isTabbarShow"></tabbar>
    <!-- 路由容器 -->
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import tabbar from "./components/Tabbar";
import { mapState } from "vuex"; // export {mapState}
// import axios from "axios";
// ES6 模块导出
export default {
  data() {
    return {};
  },
  components: {
    tabbar,
  },
  computed: {
    ...mapState("TabbarModule", ["isTabbarShow"]),
  },
  mounted() {
    console.log(mapState("TabbarModule", ["isTabbarShow"]));
  },
  // mounted() {
  //   1 - maoyan
  //   axios
  //     .get(
  //       "ajax/movieOnInfoList?token=&optimus_uuid=A65D0340FA8511EBA69FDB0D3DDA2CFF6BB932343E54403F8C7170629E8DD98A&optimus_risk_level=71&optimus_code=10"
  //     )
  //     .then((res) => {
  //       console.log(res);
  //     });
  //   2 - maizuo
  //   axios({
  //     url: "https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=1708318",
  //     headers: {
  //       "X-Client-Info":
  //         '{"a":"3000","ch":"1002","v":"5.0.4","e":"1629449388202640851992577","bc":"310100"}',
  //       "X-Host": "mall.film-ticket.film.list",
  //     },
  //     // method:"get"
  //   }).then((res) => {
  //     console.log(res.data);
  //   });
  // },
};
</script>

<style>
li {
  list-style: none;
}

* {
  margin: 0;
  padding: 0;
  touch-action: manipulation;
}

html,
body {
  width: 100%;
}

section {
  margin-bottom: 50px;
}
</style>

/* 
  https://m.maizuo.com/gateway?filmId=5610&k=2270447
  https://m.maizuo.com/gateway?filmId=5651&k=200383
 */


