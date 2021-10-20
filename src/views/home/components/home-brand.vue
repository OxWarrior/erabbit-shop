<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证" ref="target">
    <template v-slot:right>
      <a @click="index = 0" :class="{disabled:index === 0}" href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a @click="index = 1" :class="{disabled:index === 1}" href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box" ref="box">
      <ul class="list" :style="`transform:translate(${-index*1240}px)`" v-if="results.length>0">
        <li v-for="item in results" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
          </RouterLink>
        </li>
      </ul>
      <!-- 每有数据的时候临时显示骨架屏效果 -->
      <div class='skeleton' v-else>
        <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px" />
      </div>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from './home-pannel'
import { useLazyData } from '@/hook'
import { findBrand } from '@/api/home'
import { ref } from 'vue'
import XtxSkeleton from '@/components/library/xtx-skeleton.vue'

export default {
  name: 'HomeBrand',
  components: { HomePanel, XtxSkeleton },
  setup () {
    const { target, results } = useLazyData(() => findBrand(10))
    const index = ref(0) // 区分按钮
    // const list = computed(() => {
    //   return results.value.filter((item, i) => {
    //     if (index.value === 0) {
    //       return i < 5
    //     } else {
    //       return i > 4
    //     }
    //   })
    // })

    return {
      target,
      results,
      index
    }
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
