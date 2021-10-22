<template>
  <div class='sub-sort'>
    <div class="sort">
      <a @click="change(null)" :class="{ active:sortParams.sortField === null }" href="javascript:;">默认排序</a>
      <a @click="change('publishTime')" :class="{ active:sortParams.sortField === 'publishTime' }" href="javascript:;">最新商品</a>
      <a @click="change('orderNum')" :class="{ active:sortParams.sortField === 'orderNum' }" href="javascript:;">最高人气</a>
      <a @click="change('evaluateNum')" :class="{ active:sortParams.sortField === 'evaluateNum' }" href="javascript:;">评论最多</a>
      <a @click="change('price')" href="javascript:;">
        价格排序
        <i :class="{active:sortParams.sortMethod === 'asc'}" class="arrow up" />
        <i :class="{active:sortParams.sortMethod === 'desc'}" class="arrow down" />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox v-model="sortParams.inventory">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox v-model="sortParams.onlyDiscount">仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'

export default {
  name: 'SubSort',
  setup (props, { emit }) {
    // 排序相关的参数
    const sortParams = reactive({
      // sortField的取值由后端决定：
      // 最新商品 publishTime
      // 最高人气 orderNum
      // 评论最多 evaluateNum
      // 价格排序 price

      // 排序的选项（根据什么排序）
      sortField: null,
      // 价格排序的顺序（价格的正序asc和反序desc）
      sortMethod: null,
      // 是否有货
      inventory: false,
      // 是否打折
      onlyDiscount: false
    })

    const change = (type) => {
      if (type === 'price') {
        if (sortParams.sortMethod === 'asc') {
          sortParams.sortMethod = 'desc'
        } else if (sortParams.sortMethod === 'desc') {
          sortParams.sortMethod = 'asc'
        } else {
          sortParams.sortMethod = 'asc'
        }
      } else {
        sortParams.sortMethod = null
      }
      sortParams.sortField = type
    }

    watch(sortParams, (newValue) => { //
      emit('sort-change', newValue)
    })

    return {
      sortParams,
      change
    }
  }
}
</script>

<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
