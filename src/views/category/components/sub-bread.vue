<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem :to='`/category/${cateInfo.fCate.id}`'>{{cateInfo.fCate.name}}</XtxBreadItem>
    <transition name='fade-right' mode="out-in">
      <XtxBreadItem :key="cateInfo.sCate.id">{{cateInfo.sCate.name}}</XtxBreadItem>
    </transition>
  </XtxBread>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'subBread',
  setup () {
    const store = useStore()
    const route = useRoute()

    const cateInfo = computed(() => {
      const info = { // 分类信息
        fCate: {}, // 一级
        sCate: {} // 二级
      }

      store.state.cate.cateList.some(item => { // 一级和二级分类的id和name
        const cate = item.children && item.children.find(tag => tag.id === route.params.id)
        if (cate) {
          info.sCate.id = cate.id
          info.sCate.name = cate.name
          info.fCate.id = item.id
          info.fCate.name = item.name

          return true
        }
      })
      return info
    })

    return {
      cateInfo
    }
  }
}
</script>
