<template>
  <div>
    <film-swiper>
      <div class="swiper-slide" v-for="img in imgList" :key="img.id">
        <img :src="img.path" @click="handleRote(img.id)" />
      </div>
    </film-swiper>
    <!-- 只有在vue中，组件上写的class，style会自动上传到组件的根节点上 -->
    <film-header
      style="position: sticky; top: -2px; background: white; z-index: 999"
    ></film-header>
    <router-view></router-view>
  </div>
</template>

<script>
import filmHeader from "./film/FilmHeader.vue";
import filmSwiper from "./film/FilmSwiper.vue";
export default {
  data() {
    return {
      imgList: [
        {
          path: "https://static.maizuo.com/v5/upload/67f9eb733fd33f6148ae740e130d5612.jpg?x-oss-process=image/quality,Q_70",
          id: "5687",
        },
        {
          path: "https://static.maizuo.com/v5/upload/6f5e10201aaea65b311d7ab562ba097c.jpg?x-oss-process=image/quality,Q_70",
          id: "5618",
        },
        {
          path: "https://static.maizuo.com/v5/upload/fae22ffcaa41eced5e3dc7a0f2873690.jpg?x-oss-process=image/quality,Q_70",
          id: "5597",
        },

        // "https://static.maizuo.com/v5/upload/a772c91a0348d2df249a2fc3485df5f9.jpg?x-oss-process=image/quality,Q_70",
        // "https://static.maizuo.com/v5/upload/8dbab57018692a71af8bd5861717eb84.jpg?x-oss-process=image/quality,Q_70",
      ],
    };
  },
  components: {
    filmHeader,
    filmSwiper,
  },
  methods: {
    handleRote(id) {
      this.$router.push(`/detail/${id}`);
    },
  },
};
</script>