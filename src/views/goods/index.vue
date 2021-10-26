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
          <!-- 商品规格 skuId="1369155872197971970" -->
          <GoodsSku @update-sku="updateSku" :specs="detail.specs" :skus="detail.skus"></GoodsSku>
          <!-- 商品数量 -->
          <XtxNumbox :max="detail.inventory" v-model="count">数量</XtxNumbox>
          <!-- 添加购物车按钮 -->
          <XtxButton type="primary" size="middle" style="margin-top:10px">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :id="detail.id" />

      <!-- 商品详情 -->

      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <GoodsTabs></GoodsTabs>
          </div>
          <!-- 注意事项 -->
          <div class="goods-warn">
            <GoodsWarn></GoodsWarn>
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :id="detail.id" :type="1"></GoodsHot>
          <GoodsHot :id="detail.id" :type="2"></GoodsHot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import GoodsSku from './components/goods-sku'
import GoodsTabs from './components/goods-tabs'
import GoodsHot from './components/goods-hot'
import GoodsWarn from './components/goods-warn'
import { ref, provide } from 'vue'
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
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName, GoodsSku, GoodsTabs, GoodsHot, GoodsWarn },
  setup () {
    const detail = useGoods()

    // 根据选中信息更新
    const updateSku = (info) => {
      if (info) {
        detail.value.price = info.price
        detail.value.oldPrice = info.oldPrice
        detail.value.inventory = info.inventory
      }
    }

    // 商品数量
    const count = ref(1)

    provide('detail', detail)

    return {
      detail,
      count,
      updateSku
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
