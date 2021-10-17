<template>
  <!-- 主体 -->
  <div class="xtx-home-page">
    <div class="container">
    <HomeCate></HomeCate>
    </div>
  </div>
</template>

<script>
import HomeCate from './components/home-cate.vue'
export default {
  name: 'Home',
  components: {
    HomeCate
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
