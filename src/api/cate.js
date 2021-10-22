import request from '@/utils/request'

/**
 * @description 获取顶部导航栏列表数据
 * @param {}
 * @returns {Promise}
 */
export const findHeadCategory = () => {
  return request({
    method: 'get',
    url: '/home/category/head'
  })
}

/**
 * @description 获取单个顶级分类信息
 * @param {String} id - 顶级分类ID
 */
export const findTopCategory = (id) => {
  return request({
    method: 'get',
    url: '/category',
    data: { id }
  })
}

/**
 * @description 获取二级分类的筛选条件数据
 * @param {*} id 二级id
 * @returns
 */
export const findSubCategoryFilter = (id) => {
  return request({
    method: 'get',
    url: '/category/sub/filter',
    data: { id }
  })
}

/**
 * @description 获取分类下的商品（带筛选条件）
 * @param {Object} params
 */
export const findSubCategoryGoods = (data) => {
  return request({
    method: 'post',
    url: '/category/goods/temporary',
    data
  })
}
