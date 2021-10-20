<template>
  <h2>vue动画</h2>
  <button @click="showDiv">控制</button>
  <transition name="fade">
    <div class="box" v-if="isShow"></div>
  </transition>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Test',
  setup () {
    const isShow = ref(true)
    const showDiv = () => {
      isShow.value = !isShow.value
    }
    return {
      isShow,
      showDiv
    }
  }
}
</script>

<style lang="less" scoped>
  .box {
    width: 300px;
    height: 300px;
    background: pink;
  }
  .fade-leave-from,.fade-enter-to {
    opacity: 1;
  }
  .fade-leave-active,.fade-enter-active {
    transition: all 1s;
  }
  .fade-leave-to,.fade-enter-from {
    opacity: 0;
  }
</style>
