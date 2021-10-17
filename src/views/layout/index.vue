<template>
  <!-- 头部导航 -->
  <TopNav></TopNav>
  <!-- 头 -->
  <TopHeader></TopHeader>
  <!-- 吸顶组件 -->
  <HeaderSticky></HeaderSticky>
  <!-- 主体 -->
  <main>
    <router-view />
  </main>
  <!-- 底部 -->
  <BottomFooter></BottomFooter>
</template>

<script>
import TopNav from './components/top-nav.vue'
import TopHeader from './components/top-header.vue'
import BottomFooter from './components/bottom-footer.vue'
import HeaderSticky from './components/header-sticky.vue'
export default {
  name: 'Layout',
  components: {
    TopNav,
    TopHeader,
    BottomFooter,
    HeaderSticky
  }
}
</script>

<style lang="less" scoped>
  main {
    min-height: 500px;
  }
</style>
