<template>
  <div id="app">
    <!-- 因为路由用了《keep-alive》,所以再次点击详情页，数据不会的变，所以要除掉detail -->
    <keep-alive exclude="Detail">
    <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>  
  </div>
</template>

<script>
import MainTabBar from 'components/context/mainTabbar/MainTabBar'

export default {
  name: 'app',
  components: {
   MainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
