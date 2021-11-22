<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from "swiper/bundle"; // 引入swiper.js
import "swiper/swiper-bundle.min.css"; // 引入swiper.css
export default {
      mounted() {
          new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination"
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      loop: true
    });
  }
};
</script>

<style lang="scss" scoped>
.swiper-wrapper {
  img {
    width: 100%;
  }
}
</style>
