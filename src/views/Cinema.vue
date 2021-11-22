<template>
  <div>
    <van-nav-bar
      title="标题"
      left-arrow
      @click-left="handleLeft()"
      @click-right="handleRight()"
    >
      <template #left>
        {{ cityName }}
        <van-icon name="arrow-down" color="black" />
      </template>
      <template #right>
        <van-icon name="search" size="23" color="black" />
      </template>
    </van-nav-bar>
    <div class="cinema" :style="{ height: height }">
      <van-list>
        <van-cell v-for="data in cinemaList" :key="data.cinemaId">
          <div class="name">{{ data.name }}</div>
          <div class="address">{{ data.address }}</div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script>
import BetterScroll from "better-scroll";
import Vue from "vue";
import { NavBar, Icon, List, Cell } from "vant";
import { mapActions, mapMutations, mapState } from "vuex";

Vue.use(NavBar).use(Icon).use(List).use(Cell);
export default {
  data() {
    return {
      height: 0,
    };
  },
  methods: {
    ...mapMutations("CinemaModule", ["setCinemaList", "clearCinemaList"]),
    ...mapActions("CinemaModule", ["getCinemaList"]),

    handleLeft() {
      this.$router.push("/city");
      this.clearCinemaList();
    },
    handleRight() {
      this.$router.push("cinema/search");
    },
  },
  mounted() {
    // 访问cityName,cityId
    this.height = document.documentElement.clientHeight - 95 + "px";

    if (this.cinemaList.length === 0) {
      // vuex 异步流程
      this.getCinemaList(this.cityId).then((res) => {
        this.$nextTick(() => {
          new BetterScroll(".cinema", {
            scrollbar: {
              fade: true,
            },
          });
        });
      });
    } else {
      console.log("缓存");
      this.$nextTick(() => {
        new BetterScroll(".cinema", {
          scrollbar: {
            fade: true,
          },
        });
      });
    }
  },

  computed: {
    ...mapState("CinemaModule", ["cinemaList"]),
    ...mapState("CityModule", ["cityId", "cityName"]),
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