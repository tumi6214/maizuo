<template>
  <div id="kerwin-app">
    <h2>状态更新</h2>
    hello vue - {{ myname }}
    <button @click="handleClick">click</button>
    <h2>todo</h2>

    <input type="text" v-model="mytext" />
    <button @click="handleAdd">add</button>
    <ul>
      <li v-for="data in datalist" :key="data">
        {{ data }}
      </li>
    </ul>

    <h1>抽屉</h1>
    <navbar @myevent="handleEvent">
      <button @click="isShow = !isShow">slot-button</button>
    </navbar>
    <sidebar v-show="isShow"></sidebar>
  </div>
</template>

<script>
import navbar from "./components/Navbar";
import sidebar from "./components/Sidebar";
import Vue from "vue";
Vue.component("navbar", navbar); //注册全局组件

// ES6 模块导出
export default {
  data() {
    return {
      myname: "kerwin",
      mytext: "",
      datalist: [],
      isShow: false,
    };
  },
  components: {
    sidebar, // 局部注册组件
  },
  methods: {
    handleClick() {
      this.myname = "tiechui";
    },
    handleAdd() {
      console.log(this.mytext);
      this.datalist.push(this.mytext);
    },
    handleEvent(){
      this.isShow = !this.isShow
    }
  },
};
</script>

<style>
li {
  list-style: none;
  background-color: lightgreen;
}

* {
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
}
</style>
