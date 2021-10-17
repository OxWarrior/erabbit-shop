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
