<template>
  <div class="home-banner">
    <XtxCarousel :sliders="list" :auto="true" :duration="2" />
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { ref } from 'vue'

export default {
  name: 'HomeBanner',
  setup () {
    // 轮播图
    const list = ref([])
    findBanner().then(res => {
      list.value = res.result
    })

    return {
      list
    }
  }
}
</script>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
.xtx-carousel {
  // vue3深度选择器使用
  :deep(.carousel-btn.prev) {
    left: 270px;
  }
  :deep(.carousel-indicator) {
    padding-left: 250px;
  }
}
</style>
