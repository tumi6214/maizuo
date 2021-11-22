<template>
  <div v-if="filminfo">
    <detail-header v-top>{{ filminfo.name }}</detail-header>
    <div
      :style="{ backgroundImage: 'url(' + filminfo.poster + ')' }"
      style="
        height: 200px;
        background-size: cover;
        background-position: 50% 50%;
      "
    ></div>

    <div class="box">
      <div>
        <span class="filmname">{{ filminfo.name }}</span>
        <span class="filmtype">{{ filminfo.filmType.name }}</span>
        <em class="grade">{{ filminfo.grade }} 分</em>
      </div>

      <div class="wapper">{{ filminfo.category }}</div>

      <div class="wapper">{{ filminfo.premiereAt | dateFilter }}上映</div>

      <div class="wapper">
        {{ filminfo.nation }} | {{ filminfo.runtime }}分钟
      </div>

      <div id="info" class="wapper" :class="isShow ? '' : 'synopsis'">
        {{ filminfo.synopsis }}
      </div>

      <div style="text-align: center">
        <i
          class="iconfont"
          :class="isShow ? 'icon-less' : 'icon-moreunfold'"
          @click="isShow = !isShow"
        ></i>
      </div>

      <div class="otherTitle">演职人员</div>
      <detail-swiper :perslide="3" swiperclass="swiper-actors">
        <div
          class="swiper-slide"
          v-for="(actor, index) in filminfo.actors"
          :key="index"
        >
          <!-- <img :src="actor.avatarAddress" /> -->
          <div
            :style="{ backgroundImage: 'url(' + actor.avatarAddress + ')' }"
            style="
              width: 85px;
              height: 85px;
              background-size: cover;
              margin: 0 auto;
            "
          ></div>
          <div style="text-align: center">
            <div>{{ actor.name }}</div>
            <div>{{ actor.role }}</div>
          </div>
        </div>
      </detail-swiper>

      <div class="otherTitle">剧照</div>
      <detail-swiper :perslide="2" swiperclass="swiper-photos">
        <div
          class="swiper-slide"
          v-for="(photo, index) in filminfo.photos"
          :key="index"
        >
          <div
            :style="{ backgroundImage: 'url(' + photo + ')' }"
            style="
              height: 100px;
              background-size: cover;
              background-position: 50% 50%;
              margin: 0 auto;
            "
            @click="handlePreview(index)"
          ></div>
        </div>
      </detail-swiper>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import http from "@/util/http"; // 别名 @ ==> src的绝对路径
import moment from "moment";
import detailSwiper from "./detail/DetailSwiper.vue";
import detailHeader from "./detail/DetailHeader.vue";

import { ImagePreview } from "vant";
import { mapMutations } from "vuex";

Vue.filter("dateFilter", (date) => {
  //日期处理函数 - moment
  return moment(date * 1000).format("YYYY-MM-DD");
});

// 定义指令
Vue.directive("top", {
  inserted(el) {
    el.style.display = "none";
    window.onscroll = () => {
      if (document.documentElement.scrollTop || document.body.scrollTop > 50) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    };
  },
  unbind() {
    window.onscroll = null;
  },
});

export default {
  // mounted() {
  //   // this.$route 当前匹配的对象
  //   // 动态路由 & query
  //   // console.log("利用获取的id，ajax请求后端接口", this.$route.params.myid);

  //   console.log("利用获取的id，ajax请求后端接口", this.$route.query.id);
  // },

  data() {
    return {
      filminfo: null,
      isShow: false,
    };
  },
  methods: {
    handlePreview(index) {
      ImagePreview({
        images: this.filminfo.photos,
        startPosition: index,
        closeable: true,
        loop: false,
        closeIconPosition: "top-left",
      });
    },

    ...mapMutations("TabbarModule", ["changeTabbarShow"]),
  },
  components: {
    detailSwiper,
    detailHeader,
  },
  mounted() {
    this.changeTabbarShow(false);
    http({
      url: `/gateway?filmId=${this.$route.params.myid}&k=2838119`,
      headers: {
        "X-Host": "mall.film-ticket.film.info",
      },
    }).then((res) => {
      // console.log(res.data.data.film);
      this.filminfo = res.data.data.film;
    });
  },

  beforeDestroy() {
    this.changeTabbarShow(true);
  },
};
</script>

<style lang="scss" scoped>
.synopsis {
  height: 50px;
  overflow: hidden;
}
.box {
  // width: 100%;
  margin: 10px;
  position: relative;
  overflow: hidden;
  font-size: 13px;
  .filmname {
    font-size: 18px;
  }
  .filmtype {
    font-size: 10px;
    margin-left: 5px;
    background-color: lightgray;
    color: white;
  }
  .grade {
    font-style: italic;
    color: orange;
    font-size: 16px;
    float: right;
    margin-right: 20px;
  }
  .wapper {
    color: gray;
    margin-top: 6px;
  }
  #info {
    width: 100%;
    margin-top: 20px;
    margin-right: 20px;
    transition: all 0.5s;
  }
  .swiper-slide {
    width: 200px;
  }
  .otherTitle {
    margin: 15px 0;
    font-size: 16px;
  }
}
</style>