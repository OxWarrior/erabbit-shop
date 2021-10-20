<template>
  <div class='xtx-bread'>
    <!-- 1 -->
    <div class="xtx-bread-item">
      <RouterLink to="/">首页</RouterLink>
    </div>
    <i class="iconfont icon-angle-right"></i>
    <!-- 2 -->
    <div class="xtx-bread-item" v-if="parentName">
      <RouterLink v-if="parentPath" :to="parentPath">{{parentName}}</RouterLink>
      <span v-else>{{parentName}}</span>
    </div>
    <i v-if="parentName" class="iconfont icon-angle-right"></i>
    <!-- 3 -->
    <div class="xtx-bread-item">
      <span>
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XtxBread',
  props: {
    parentPath: {
      type: String,
      default: ''
    },
    parentName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang='less'>
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
