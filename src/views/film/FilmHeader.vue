<template>
  <ul>
    <router-link to="/film/nowplaying" tag="li" active-class="active"
      >正在热映</router-link
    >
    <router-link to="/film/comingsoon" tag="li" active-class="active"
      >即将上映</router-link
    >
  </ul>
</template>

<style lang="scss" scoped>
ul {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  li {
    flex: 1;
  }
}

.active {
  color: lightcoral;
  border-bottom: 2px solid lightcoral;
}
</style>