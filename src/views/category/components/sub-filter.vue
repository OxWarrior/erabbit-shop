<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="conditions.length && isLoading">
    <!-- 品牌条件 -->
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a @click="brands.selectedBrand = item.id" :class="{active:brands.selectedBrand === item.id}" href="javascript:;" v-for="item in brands.list" :key="item.id">{{item.name}}</a>
      </div>
    </div>
    <!-- 规格条件 -->
    <div class="item" v-for="item in conditions" :key="item.id">
      <div class="head">{{item.name}}：</div>
      <div class="body">
        <a @click="item.selectedProp = tag.id" :class="{active:item.selectedProp === tag.id}" href="javascript:;" v-for="tag in item.properties" :key="tag.id">{{tag.name}}</a>
      </div>
    </div>
  </div>

  <div class="sub-filter" v-else>
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>

<script>
import { findSubCategoryFilter } from '@/api/cate'
import { useRoute } from 'vue-router'
import { reactive, ref, watch } from 'vue'

export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    const route = useRoute()

    const brands = reactive({ // 品牌
      list: [],
      // 记录选中的品牌
      selectedBrand: null // 选中标识符 选中让其与此项id相等,全部为null
    })
    const conditions = ref([]) // 属性
    const isLoading = ref(true) // 加载切换

    watch(() => route.params.id, (id) => { // 深度监听二级id切换
      if (route.fullPath !== `/category/sub/${id}`) return

      isLoading.value = false // 加载中为true

      findSubCategoryFilter(id).then(res => {
        res.result.brands.unshift({ // 首位-- 全部
          id: null,
          name: '全部'
        })
        brands.list = res.result.brands

        res.result.saleProperties.forEach(item => {
          // 控制每一个规格的选中
          item.selectedProp = null // 选中标识符

          item.properties.unshift({ // 首位-- 全部
            id: null,
            name: '全部'
          })
        })
        conditions.value = res.result.saleProperties

        // 加载结束隐藏
        isLoading.value = true
      })
    }, {
      immediate: true
    })

    watch([brands, conditions], () => { // 深度侦听筛选条件
      const params = {}
      params.brandId = brands.selectedBrand

      // 获取规格的keyName:valueName 选中的规格
      const attrs = []
      conditions.value.forEach(item => {
        const propInfo = item.properties.find(tag => tag.id === item.selectedProp)
        const attr = {
          groupName: item.name,
          propertyName: propInfo.name
        }
        attrs.push(attr)
      })

      params.attrs = attrs
      // 子传父选中的数据
      emit('filter-change', params)
    }, {
      deep: true
    })

    return {
      brands,
      conditions,
      isLoading
    }
  }
}
</script>

<style scoped lang='less'>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .xtx-skeleton {
      padding: 10px 0;
    }
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
