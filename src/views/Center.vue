<template>
  <div id="box">
    <div id="avatar">
      <img
        src="https://mall.s.maizuo.com/bd6d9303e481f78fcdcee3f4a295f9b9.jpg"
      />
      <div class="telephone">{{ telephone | phoneFilter }}</div>
    </div>

    <div class="list">
      <div class="wapper">
        <img
          src="data:image/png;base64,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"
        />
        <span class="text">余额</span>
        <span class="info">￥0</span>
        <van-icon name="arrow" color="lightgray" />
      </div>

      <div class="wapper">
        <img
          src="data:image/png;base64,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"
        />
        <span class="text">设置</span>
        <van-icon name="arrow" color="lightgray" />
      </div>
    </div>

    <div class="sign-out">
      <button @click="handleSignOut()">退出登录</button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Icon } from "vant";

Vue.use(Icon);

Vue.filter("phoneFilter", (phone) => {
  return phone.substr(0, 3) + "****" + phone.substr(7, 11);
});
export default {
  // 组件内的路由拦截
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("token")) {
      next("/login");
    } else {
      next();
    }
  },
  data() {
    return {
      telephone: "",
    };
  },
  methods: {
    handleSignOut() {
      localStorage.removeItem("token");

      this.$router.push("/login");
    },
  },
  mounted() {
    this.telephone = JSON.parse(localStorage.getItem("token")).telephone;
  },
};
</script>

<style lang="scss" scoped>
#avatar {
  height: 160px;
  background-image: url("https://assets.maizuo.com/h5/v5/public/app/img/bg.a5bdd690.png");
  background-size: cover;
  background-position: center;
  position: relative;
  img {
    width: 17%;
    border: 2px solid white;
    border-radius: 50%;
    position: absolute;
    left: 20px;
    top: 50px;
  }
  .telephone {
    color: white;
    position: absolute;
    left: 110px;
    top: 78px;
  }
}

.list {
  height: auto;
  margin-top: 10px;
  background-color: white;
  .wapper {
    height: 50px;
    line-height: 50px;
    position: relative;
    border-bottom: 1px solid #eee;
    img {
      position: relative;
      top: 5px;
      left: 10px;
      width: 20px;
    }
    .text {
      margin-left: 22px;
    }
    .info {
      position: absolute;
      right: 50px;
      color: gray;
      font-size: 15px;
    }
    .van-icon {
      position: absolute;
      top: 16px;
      right: 20px;
    }
  }
}

.sign-out {
  height: 20px;
  margin-top: 60px;
  text-align: center;
  button {
    width: 320px;
    height: 40px;
    border: none;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    background-color: rgb(255, 126, 38);
    color: #fff;
  }
}
</style>