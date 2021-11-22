<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
      />
    </form>

    <van-list>
      <van-cell v-for="data in computedCinemaList" :key="data.cinemaId">
        <div class="name">{{ data.name }}</div>
        <div class="address">{{ data.address }}</div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import Vue from "vue";
import { Search, List, Cell } from "vant";
import { mapActions, mapState } from "vuex";

Vue.use(Search).use(List).use(Cell);
export default {
  mounted() {
    if (this.cinemaList.length === 0) {
      this.getCinemaList(this.cityId);
    } else {
      console.log("缓存");
    }
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    ...mapActions("CinemaModule", ["getCinemaList"]),

    onCancel() {
      // push,back,replace 都可
      this.$router.replace("/cinema");
    },
  },
  computed: {
    ...mapState("CinemaModule", ["cinemaList"]),
    ...mapState("CityModule", ["cityId"]),

    computedCinemaList() {
      if (this.value === "") return [];
      return this.cinemaList.filter(
        (item) =>
          item.name.toUpperCase().includes(this.value.toUpperCase()) ||
          item.address.toUpperCase().includes(this.value.toUpperCase())
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.van-cell {
  .name {
    font-size: 15px;
  }
  .address {
    font-size: 12px;
    color: gray;
  }
}

.cinema {
  height: 300px;
  overflow: hidden;
  position: relative; // 修正滚动条的位置
}
</style>