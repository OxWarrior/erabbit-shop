<template>
  <!-- 轮播图 -->
  <div class='xtx-carousel' @mouseenter="enter" @mouseleave="leave">
    <ul class="carousel-body">
      <li :class="{fade:currentIndex === i}" v-for="(item,i) in sliders" :key="item.id" class="carousel-item">
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="">
        </RouterLink>
      </li>
    </ul>
    <a @click="toggel(true)" href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <a @click="toggel(false)" href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <span @click="currentIndex = i-1" :class="{active:currentIndex === i-1}" v-for="i in sliders.length" :key="i"></span>
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, ref, watch } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    sliders: { // 轮播图数据
      type: Array,
      default: () => []
    },
    auto: { // 是否自动播放
      type: Boolean,
      default: true
    },
    duration: { // 间隔时间
      type: Number,
      default: 1
    }
  },
  setup (props) {
    // 当前索引
    const currentIndex = ref(0)

    let timer = null
    const autoplayFn = () => { // 定时器自动播放方法
      timer = setInterval(() => {
        // 先索引+再判断
        currentIndex.value++
        if (currentIndex.value > props.sliders.length - 1) { // 当前索引大于数据最后一个索引
          currentIndex.value = 0
        }
      }, props.duration * 1000)
    }
    // 监测图片数据改变，调用播放方法
    watch(() => props.sliders, () => {
      if (props.auto && props.sliders.length > 1) { // true并且图片数量至少为2
        currentIndex.value = 0 //
        autoplayFn()
      }
    })
    // 鼠标进入
    const enter = () => {
      // 如果计时开始了才清空定时器
      if (timer) clearInterval(timer)
    }
    // 鼠标离开
    const leave = () => {
      // 先销毁之前的定时任务，防抖效果
      if (timer) clearInterval(timer)
      // 再启用定时
      if (props.auto && props.sliders.length > 1) autoplayFn()
    }

    // 前后切换按钮
    const toggel = (bool) => {
      if (bool) { // 向左
        if (currentIndex.value <= 0) { // 第一张跳最后一张
          currentIndex.value = props.sliders.length - 1
        } else {
          currentIndex.value--
        }
      } else {
        if (currentIndex.value >= props.sliders.length - 1) { // 最后一张跳第一张
          currentIndex.value = 0
        } else {
          currentIndex.value++
        }
      }
    }

    // 清空定时器
    onBeforeUnmount(() => {
      if (timer) clearInterval(timer)
    })

    return {
      currentIndex,
      enter,
      leave,
      toggel
    }
  }

}
</script>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
