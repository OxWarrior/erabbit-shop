import request from '@/utils/request'

/**
 * @description 获取品牌数据
 * @param {*} limit
 * @returns
 */
export const findBrand = (limit = 6) => {
  return request({
    method: 'get',
    url: '/home/brand',
    data: { limit }
  })
}
