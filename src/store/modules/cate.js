// 分类模块

import { findHeadCategory } from '@/api/cate.js'

import { category } from '@/utils/constant'

export default {
  namespaced: true,
  state () {
    return {
      // 分类数组
      cateList: category.map((item, i) => ({
        id: i,
        name: item
      }))
    }
  },
  mutations: {
    // 更新标志位状态
    updateState (state, payload) {
      const cate = state.cateList.find(item => item.id === payload.id)
      if (cate) {
        cate.open = payload.open
      }
    },

    // 更新分类
    updateCate (state, payload) {
      state.cateList = payload
    }
  },
  actions: {
    // 获取分类
    async getCateList (context) {
      const res = await findHeadCategory()
      if (res && res.result) {
        // 给定一级二级分类的标志位，以显示隐藏
        res.result.forEach(item => {
          item.open = false
        })

        context.commit('updateCate', res.result)
      }
    }
  },
  getters: {
    // 处理后的左侧菜单数据
    leftCateList (state) {
      return state.cateList.map(item => ({
        ...item,
        children: item.children && item.children.filter((tag, i) => i < 2)
      }))
    }
  }
}
