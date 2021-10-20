<template>
  <div class='home-category' @mouseleave="categoryId = null">
    <!-- 左侧菜单 -->
    <ul class="menu">
      <!-- 鼠标进入一级菜单id -->
      <li @mouseenter="categoryId = item.id" :class="{active:categoryId === item.id}" v-for="item in $store.getters['cate/leftCateList']" :key="item.id">
        <RouterLink to="/">{{item.name}}</RouterLink>
        <!-- 二级菜单 -->
        <template v-if="item.children">
          <RouterLink v-for="tag in item.children" :key="tag.id" to="/">{{tag.name}}</RouterLink>
        </template>
        <!-- 骨架屏 -->
        <span v-else>
          <XtxSkeleton width="60px" height="18px" style="margin-right:5px" bg="rgba(255,255,255,0.2)" />
+          <XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
        </span>
      </li>
      <!-- 品牌 -->
      <li @mouseenter="categoryId = brand.id" :class="{active:categoryId === brand.id}">
        <RouterLink to="/">{{brand.name}}</RouterLink>
        <RouterLink to="/">{{brand.children[0].name}}</RouterLink>
      </li>
    </ul>

    <!-- 弹层 -->
    <div class="layer">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <!-- 商品列表 -->
      <ul v-if="categoryId !== 'brand'">
        <li v-for="item in goods" :key="item.id">
          <RouterLink to="/">
            <!-- <img :src="item.picture" alt=""> -->
            <img v-lazyimg="item.picture" alt="">
            <div class="info">
              <p class="name ellipsis-2">{{item.name}}</p>
              <p class="desc ellipsis">{{item.desc}}</p>
              <p class="price"><i>¥</i>{{item.price}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌 -->
      <ul v-else>
        <li class="brand" v-for="item in brand.brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{item.place}}</p>
              <p class="name ellipsis">{{item.nameEn}}</p>
              <p class="desc ellipsis-2">{{item.name}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
    <!-- <XtxSkeleton width="70px" height="70px" bg="pink" :animated="true"></XtxSkeleton> -->
  </div>
</template>

<script>
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { findBrand } from '@/api/home'

export default {
  name: 'HomeCategory',
  setup () {
    const store = useStore()

    // 一级id
    const categoryId = ref(null)
    // 一级goods，弹层使用
    const goods = computed(() => {
      const cate = store.state.cate.cateList.find(item => item.id === categoryId.value)
      return cate ? cate.goods : []
    })

    // 品牌
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-children', name: '品牌推荐' }],
      brands: []
    })
    // 获取品牌数据(goods)
    findBrand().then(res => {
      brand.brands = res.result
    })

    return {
      categoryId,
      goods,
      brand
    }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        & .brand {
          height: 180px;
          a {
            align-items: flex-start;
            img {
              width: 120px;
              height: 160px;
            }
            .info {
              p {
                margin-top: 8px;
              }
              .place {
                color: #999;
              }
            }
          }
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
