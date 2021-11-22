<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的~"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="data in datalist"
        :key="data.filmId"
        @click="handleClick(data.filmId)"
      >
        <img :src="data.poster" />
        <div style="overflow: hidden; margin-top: 5px">
          <span id="filmname">{{ data.name }}</span>
          <span id="filmtype">{{ data.filmType.name }}</span>
        </div>
        <p
          style="
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
          class="wapper"
        >
          主演:{{ data.actors | actorFilter }}
        </p>
        <p class="wapper">{{ data.nation }} | {{ data.runtime }} 分钟</p>
        <p class="wapper">上映时期：{{ data.premiereAt | dateFilter }}</p>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import http from "@/util/http";
import Vue from "vue";
import moment from "moment";
import { List, Cell } from "vant";
import { mapState } from "vuex";

Vue.use(List).use(Cell); // 全局注册

Vue.filter("actorFilter", (actors) => {
  if (actors === undefined) return "暂无主演";
  return actors.map((item) => item.name).join(" ");
});

Vue.filter("dateFilter", (date) => {
  //日期处理函数 - moment
  return moment(date * 1000).format("YYYY-MM-DD");
});
export default {
  data() {
    return {
      datalist: [],
      loading: false, // 是否正在加载中，防止多次触发问题
      finished: false,
      current: 1, // 记录第几页数据
      total: 0,
    };
  },
  computed: {
    ...mapState("CityModule", ["cityId"]),
  },
  mounted() {
    http({
      url: `/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=2&k=6814979`,
      headers: {
        "X-Host": "mall.film-ticket.film.list",
      },
      // method:"get"
    }).then((res) => {
      console.log(res.data.data.films);
      this.datalist = res.data.data.films;
      this.total = res.data.data.total;
    });
  },
  methods: {
    onLoad() {
      // 1. ajax请求新页面的数据
      // 2. 合并新数据到老数据
      // 3. this.loading = false
      if (this.datalist.length === this.total && this.datalist.length !== 0) {
        this.finished = true;
        return;
      }
      this.current++;
      http({
        url: `/gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=2&k=6814979`,
        headers: {
          "X-Host": "mall.film-ticket.film.list",
        },
        // method:"get"
      }).then((res) => {
        // console.log(res.data.data.films);
        this.datalist = [...this.datalist, ...res.data.data.films];
      });
      this.loading = false;
    },
    handleClick(id) {
      // 1-路径
      this.$router.push(`/detail/${id}`); //编程式导航

      // 2-路由名字
      // this.$router.push({
      //   name: "kerwinDetail",
      //   params: {
      //     myid: id,
      //   },
      // });

      // 3-query方式跳转详情
      // this.$router.push(`/detail?id=${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.van-cell {
  overflow: hidden;
  padding: 10px;
  font-size: 13px;
  img {
    float: left;
    width: 80px;
    margin-right: 10px;
  }
  #filmname {
    font-size: 15px;
  }
  #filmtype {
    margin-left: 5px;
    background-color: lightgray;
    color: white;
  }
  .wapper {
    color: gray;
  }
  #grade {
    color: orange;
    margin-left: 5px;
    font-size: 15px;
  }
}
</style>