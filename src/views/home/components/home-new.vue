<template>
  <div class="home-new" ref="target">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore path="/" />
      </template>
      <!-- 面板内容 -->
      <transition name="fade">
        <ul class="goods-list" v-if="goods.length">
          <li v-for="item in goods" :key="item.id">
            <RouterLink :to="`/product/${item.id}`">
              <!-- <img :src="item.picture" alt=""> -->
              <img v-lazyimg="item.picture" alt="">
              <p class="name ellipsis">{{item.name}}</p>
              <p class="price">&yen;{{item.price}}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else></HomeSkeleton>
      </transition>

    </HomePanel>
  </div>
</template>

<script>
// import { ref } from 'vue'
import HomePanel from './home-pannel'
import { findNew } from '@/api/home'
import HomeSkeleton from './home-skeleton.vue'
import { useLazyData } from '@/hook'
// import { useIntersectionObserver } from '@vueuse/core'

export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup () {
    // //
    // const goods = ref([])

    // const target = ref(null)
    // const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    //   // 判断被监听的元素是否已经进入可视区
    //   if (isIntersecting) {
    //     findNew().then(data => {
    //       goods.value = data.result
    //     })
    //   }
    //   // 如果获取到了数据，可以取消继续监听
    //   stop()
    // })
    const { results: goods, target } = useLazyData(findNew)
    return { goods, target }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow(); // less语法混入
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
