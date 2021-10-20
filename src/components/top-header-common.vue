<template>
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li  @mouseenter="show(item.id)" @mouseleave="hide(item.id)" :class="{active:item.open}" v-for="item in $store.state.cate.cateList" :key="item.id">
      <!-- 一级分类 -->
      <router-link @click="hide(item.id)" :to="`/category/${item.id}`">{{item.name}}</router-link>
      <!-- <a href="#">{{item.name}}</a> -->
      <!-- 二级分类 -->
      <div class="layer">
        <ul>
          <li v-for="tag in item.children" :key="tag.id">
            <router-link @click="hide(item.id)" :to="`/category/sub/${tag.id}`">
              <img :src="tag.picture" alt="">
              <p>{{tag.name}}</p>
            </router-link>
            <!-- <a href="#">
              <img :src="tag.picture" alt="">
              <p>{{tag.name}}</p>
            </a> -->
          </li>
        </ul>
      </div>
    </li>

  </ul>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'AppHeaderNav',
  setup () {
    const store = useStore()
    store.dispatch('cate/getCateList')

    // 鼠标进入
    const show = (id) => {
      store.commit('cate/updateState', {
        id,
        open: true
      })
    }

    // 鼠标离开
    const hide = (id) => {
      store.commit('cate/updateState', {
        id,
        open: false
      })
    }
    return {
      show,
      hide
    }
  }
}
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    // 父级选择器
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
    }
    // 初始样式 不显示
    .layer {
      width: 1240px;
      background-color: #fff;
      position: absolute;
      left: -200px;
      top: 56px;
      height: 0; //
      overflow: hidden; // 隐藏
      opacity: 0; // 透明度
      box-shadow: 0 0 5px #ccc;
      transition: all 0.2s 0.1s;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 70px;
        align-items: center;
        height: 124px;
        li {
          width: 110px;
          text-align: center;
          img {
            width: 60px;
            height: 60px;
          }
          p {
            padding-top: 10px;
          }
          &:hover {
            p {
              color: @xtxColor;
            }
          }
        }
      }
    }
    // hover之后显示出来   改hover
    &.active {
      // 加上 >
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      > .layer {
        height: 124px;
        opacity: 1; // 显示
      }
    }
  }
}
</style>
