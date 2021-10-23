<template>
  <div class='xtx-goods-page'>
    <div class="container" v-if="detail">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${detail.categories[1].id}`">{{detail.categories[1].name}}</XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${detail.categories[0].id}`">{{detail.categories[0].name}}</XtxBreadItem>
        <XtxBreadItem>{{detail.name}}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <!-- 图片放大镜 -->
          <GoodsImage :images='detail.mainPictures'></GoodsImage>
          <!-- 商品销量 -->
          <GoodsSales></GoodsSales>
        </div>
        <div class="spec">
          <!-- 商品详情 -->
          <GoodsName :goods="detail"></GoodsName>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { findGoods } from '@/api/product'

const useGoods = () => {
  const route = useRoute()
  const detail = ref(null)

  findGoods(route.params.id).then(res => {
    detail.value = res.result
  })
  return detail
}

export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName },
  setup () {
    const detail = useGoods()

    return {
      detail
    }
  }
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
