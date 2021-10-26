<template>
  <div class="xtx-pagination">
    <a @click="changeNum(false)" href="javascript:;" :class="{disabled:page === 1}">上一页</a>
    <span v-if="page > 3">...</span>
    <a @click="changeNum(item)" href="javascript:;" :class="{active:page === item}" v-for="(item,index) in list" :key="index">{{item}}</a>
    <span v-if="page < pages - 2">...</span>
    <a @click="changeNum(true)" href="javascript:;" :class="{disabled:page === pages}">下一页</a>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
export default {
  name: 'XtxPagination',
  props: {
    total: {
      type: Number,
      default: 100
    },
    pagesize: {
      type: Number,
      default: 10
    }
  },
  setup (props, { emit, attrs }) {
    // 当前页
    const page = ref(attrs.currentPage)
    // 一共多少页
    const pages = computed(() => {
      return Math.ceil(props.total / props.pagesize)
    })
    // 计算中间显示的页码
    const list = computed(() => {
      const result = []

      if (pages.value <= 5) { // 共只有5页或更少情况
        for (let i = 1; i <= pages.value; i++) {
          result.push(i)
        }
      } else {
        if (page.value <= 3) { // 最前的三页情况
          for (let i = 1; i <= 5; i++) {
            result.push(i)
          }
        } else if (page.value >= pages.value - 2) { // 最后的三页情况
          for (let i = pages.value - 4; i <= pages.value; i++) {
            result.push(i)
          }
        } else { // 中间页的情况
          for (let i = page.value - 2; i <= page.value + 2; i++) {
            result.push(i)
          }
        }
      }

      return result
    })

    // 切换页码
    const changeNum = (type) => {
      if (type === true) { // 下一页
        if (page.value < pages.value) {
          page.value++
        }
      } else if (type === false) { // 上一页
        if (page.value > 1) {
          page.value--
        }
      } else { // 点击页码切换
        page.value = type
      }
      emit('change-page', page.value)
    }

    return {
      list,
      page,
      pages,
      changeNum
    }
  }
}
</script>

<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
