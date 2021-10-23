<template>
  <div class="goods-image">
    <!-- 放大图片的容器 -->
    <div v-show="isShow" class="large" :style="[{backgroundImage:`url(${images[currIndex]})`},bgPosition]"></div>
    <!-- 左侧中等大小的图片 -->
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="">
      <!-- 遮罩层 -->
      <div v-show="isShow" class="layer" :style="position"></div>
      <!-- 数组可以绑定多个 -->
    </div>
    <!-- 选项卡 -->
    <ul class="small">
      <li v-for="(img,i) in images" :key="img" :class="{active:i===currIndex}">
        <img @mouseenter="currIndex=i" :src="img" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
const usePreviewImg = () => {
// 图片当前索引
  const currIndex = ref(0)

  const target = ref(null) // 目标容器
  const isShow = ref(false) // 控制右侧放大图和遮罩层显示
  const position = reactive({
    left: 0,
    top: 0
  })
  const bgPosition = reactive({
    backgroundPositionX: 0,
    backgroundPositionY: 0
  })

  // 鼠标距离目标的坐标以及是否在外
  const { elementX, elementY, isOutside } = useMouseInElement(target)

  // 监听鼠标移动变化
  watch([elementX, elementY, isOutside], () => {
    // console.log(elementX.value, elementY.value, isOutside.value)
    isShow.value = !isOutside.value

    // 控制遮罩层移动
    if (elementX.value < 100) {
      position.left = 0
    } else if (elementX.value > 300) {
      position.left = 200 // 鼠标位于中心,position距离为 -100
    } else {
      position.left = elementX.value - 100
    }
    if (elementY.value < 100) {
      position.top = 0
    } else if (elementY.value > 300) {
      position.top = 200
    } else {
      position.top = elementY.value - 100
    }
    // 大图显示的位置计算
    bgPosition.backgroundPositionX = -position.left * 2 + 'px'
    bgPosition.backgroundPositionY = -position.top * 2 + 'px'

    position.left += 'px' // 单位
    position.top += 'px'
  })
  return { currIndex, target, position, isShow, bgPosition }
}

export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const { currIndex, target, position, isShow, bgPosition } = usePreviewImg()
    return { currIndex, target, position, isShow, bgPosition }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
