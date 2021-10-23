<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="filterChange"></SubFilter>

      <!-- <span>{{checked}}</span>
      <XtxCheckbox v-model="checked">是否有库存</XtxCheckbox> -->

      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="sortChange" />
        <!-- 列表 -->
        <ul>
          <li v-for="item in list" :key="item.id">
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <XtxInfiniteLoading :loading="loading" :finished="finished" @load="load"></XtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort'
import GoodsItem from './components/goods-item'
import { findSubCategoryGoods } from '@/api/cate'
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup () {
    const route = useRoute()

    const loading = ref(false) // 是否加载
    const finished = ref(false) // 加载完成
    const list = ref([]) // 商品列表
    const total = ref(0) // 商品总数
    const reqParams = reactive({ // 请求参数
      categoryId: route.params.id,
      page: 1,
      pagesize: 10
    })

    // 滑动加载
    const load = () => {
      // 加载中标志
      loading.value = true
      // 数据的长度大于商品总数并且商品总数不为初始值0 -- 显示没有更多数据
      if (list.value.length >= total.value && total.value > 0) {
        finished.value = true
      }

      findSubCategoryGoods(reqParams).then(res => {
        // 加载完成标志 先隐藏加载 然后判断如果没有数据，显示没有更多数据
        loading.value = false
        if (res.result.items.length === 0) {
          // 没有更多数据了
          finished.value = true
          return
        }
        // 拼接
        list.value = [...list.value, ...res.result.items]
        total.value = res.result.counts

        // 下次请求页数+1
        reqParams.page++
      })
    }

    watch(() => route.params.id, () => { // 二级切换
      list.value = []
      total.value = 0
      reqParams.page = 1
      loading.value = false
      finished.value = false
    })

    // 排序切换
    const sortChange = (sortParams) => {
      Object.assign(reqParams, sortParams) // 合并

      if (list.value.length === 0) { // 商品列表无数据重新加载，否则置空
        load()
      } else {
        list.value = []
      }

      list.value = []
      total.value = 0
      reqParams.page = 1
      loading.value = false
      finished.value = false
    }

    // 筛选切换
    const filterChange = (filterParams) => {
      Object.assign(reqParams, filterParams)
      if (list.value.length === 0) {
        load()
      } else {
        list.value = []
      }

      list.value = []
      total.value = 0
      reqParams.page = 1
      loading.value = false
      finished.value = false
    }

    return {
      loading,
      finished,
      list,
      load,
      sortChange,
      filterChange
    }
  }

}
</script>

<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
