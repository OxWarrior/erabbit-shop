<template>
  <!-- 主体 -->
  <div class="xtx-home-page">
    <div class="container">
      <!-- 左侧 -->
      <HomeCate></HomeCate>
      <!-- 轮播图 -->
      <HomeBanner></HomeBanner>
    </div>
    <!-- 新鲜好物 -->
    <HomeNew></HomeNew>
    <!-- 人气好物 -->
    <HomeHot></HomeHot>
    <!-- 热门品牌 -->
    <HomeBrand></HomeBrand>
    <!-- 商品区块 -->
    <HomeProduct></HomeProduct>
  </div>
</template>

<script>
import HomeCate from './components/home-cate.vue'
import HomeBanner from './components/home-banner.vue'
import HomeNew from './components/home-new'
import HomeHot from './components/home-hot'
import HomeBrand from './components/home-brand'
import HomeProduct from './components/home-product'

export default {
  name: 'Home',
  components: {
    HomeCate,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct
  }
}
</script>

<style lang="less" scoped>
.xtx-home-page {
  .container {
    width: 1240px;
    margin: 0 auto;
    position: relative;
  }
}
</style>
