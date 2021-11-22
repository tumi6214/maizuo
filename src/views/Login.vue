<template>
  <div class="box">
    <div id="logo">
      <img
        src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png"
      />
    </div>

    <div class="login-form">
      <div class="form-group">
        <input type="text" placeholder="手机号" v-model="telephone" />
      </div>
      <div class="form-group">
        <input type="password" placeholder="密码" v-model="password" />
      </div>
      <div class="form-submit">
        <button @click="handleLogin()">登录/注册</button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Button } from "vant";
import { mapMutations } from "vuex";

Vue.use(Button);
export default {
  data() {
    return {
      telephone: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      localStorage.setItem(
        "token",
        JSON.stringify({
          telephone: this.telephone,
          password: this.password,
        })
      );

      this.$router.push("/center");
    },

    ...mapMutations("TabbarModule", ["changeTabbarShow"]),
  },
  mounted() {
    this.changeTabbarShow(false);
  },
  beforeDestroy() {
    this.changeTabbarShow(true);
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 667px;
  background-color: white;
  overflow: hidden;
  #logo {
    width: 60px;
    height: 60px;
    margin: 70px auto;
    img {
      width: 100%;
    }
  }
  .login-form {
    height: 200px;
    color: black;
    .form-group {
      height: 30px;
      padding: 10px;
      border-bottom: 1px solid #eee;
      line-height: 30px;
      input {
        padding-left: 20px;

        border: none;
        outline: none;
      }
    }
    .form-submit {
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
        background-color: #ff5f16;
        color: #fff;
      }
    }
  }
}
</style>