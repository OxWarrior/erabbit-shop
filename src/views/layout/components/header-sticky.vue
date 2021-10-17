<template>
  <div class="app-header-sticky" :class="{show:top >= 78}" >
    <div class="container" v-if="top >= 78">
      <!-- 左侧图标 -->
      <RouterLink class="logo" to="/" />
      <!-- 中间的分类导航菜单 -->
      <TopHeadearCommon />
      <!-- 右侧按钮 -->
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeadearCommon from '@/components/top-header-common.vue'
// import { ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'

export default {
  name: 'AppHeaderSticky',
  components: { TopHeadearCommon },
  setup () {
    const { y: top } = useWindowScroll()
    return {
      top
    }
  }
  // setup () {
  //   // 吸顶距离顶部距离
  //   const top = ref(0)
  //   window.onscroll = () => { // 滚动时距离
  //     top.value = document.documentElement.scrollTop
  //   }

  //   return {
  //     top
  //   }
  // }
}
</script>

<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此处为关键样式!!!
  // 默认情况下完全把自己移动到上面
  transform: translateY(-100%);
  // 完全透明
  opacity: 0;
  // 显示出来的类名
  &.show {
    transition: all 0.3s linear; // 过渡动画
    transform: none; // 置空偏移
    opacity: 1; //
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url('~@/assets/images/logo.png') no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
