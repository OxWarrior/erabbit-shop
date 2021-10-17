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
