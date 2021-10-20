<template>
  <div class="home-product" ref="target">
    <HomePanel title="生鲜" v-for="item in results" :key="item.id">
      <!-- 右侧 -->
      <template v-slot:right>
        <div class="sub">
          <RouterLink to="/" v-for="tag in item.children" :key="tag.id">{{tag.name}}</RouterLink>
        </div>
        <XtxMore />
      </template>
      <!-- 商品区 -->
      <div class="box">
        <!-- 左边大图 -->
        <RouterLink class="cover" to="/">
          <!-- <img :src="item.picture" alt=""> -->
          <img v-lazyimg="item.picture" alt="">
          <strong class="label">
            <span>{{item.name}}</span>
            <span>{{item.saleInfo}}</span>
          </strong>
        </RouterLink>
        <!-- 右边商品列表 -->
        <ul class="goods-list">
          <li v-for="goods in item.goods" :key="goods.id">
            <HomeGoods :goods="goods" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-pannel'
import HomeGoods from './home-goods'
import { findGoods } from '@/api/home'
import { useLazyData } from '@/hook'

export default {
  name: 'HomeProduct',
  components: { HomePanel, HomeGoods },
  setup () {
    // 通过懒加载的方式获取商品区块的数据
    const { results, target } = useLazyData(findGoods)

    return { results, target }
  }
}
</script>

<style scoped lang='less'>
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0,-50%,0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0,0,0,.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0,0,0,.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n+4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
