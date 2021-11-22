<template>
  <div>
    <van-index-bar :index-list="computedCityList" @select="handleSelect">
      <div v-for="item in cityList" :key="item.type">
        <van-index-anchor :index="item.type" />
        <van-cell
          :title="text.name"
          v-for="(text, index) in item.list"
          :key="index"
          @click="handleChangePage(text.cityId, text.name)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import Vue from "vue";
import { IndexBar, IndexAnchor, Cell, Toast } from "vant";
import http from "@/util/http";
import { mapMutations } from "vuex";

Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
export default {
  data() {
    return {
      cityList: [
        {
          type: "A",
          list: ["A1", "A2", "A3"],
        },
        {
          type: "B",
          list: ["B1", "B2", "B3"],
        },
        {
          type: "C",
          list: ["C1", "C2", "C3"],
        },
      ],
    };
  },
  mounted() {
    http({
      url: "/gateway?k=2509962",
      headers: {
        "X-Host": " mall.film-ticket.city.list",
      },
    }).then((res) => {
      this.cityList = this.handleCityData(res.data.data.cities);
    });
  },
  methods: {
    handleCityData(cities) {
      // 输入原始数据，输出目标数据
      // console.log(cities);
      const letterArr = [];
      const newCities = [];

      for (let code = 65; code < 91; code++) {
        letterArr.push(String.fromCharCode(code));
      }

      letterArr.forEach((letter) => {
        let list = cities.filter(
          (item) => item.pinyin.substring(0, 1).toUpperCase() === letter
        );
        if (list.length > 0) {
          newCities.push({
            type: letter,
            list: list,
          });
        }
      });
      console.log(newCities);
      return newCities;
    },
    handleSelect(index) {
      Toast(index);
    },
    handleChangePage(id, name) {
      // this.$store.state.cityName = name;
      this.changeCityId(id);
      this.changeCityName(name);

      this.$router.back();
    },

    ...mapMutations("CityModule", ["changeCityId", "changeCityName"]),
  },
  computed: {
    computedCityList() {
      return this.cityList.map((item) => item.type);
    },
  },
};
</script>

<style lang="scss" scoped>
// .van-toast--html,
// .van-toast--text {
//   min-width: 32px !important;
//   min-height: 40px !important;
// }
//
</style>