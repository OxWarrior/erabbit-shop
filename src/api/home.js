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

/**
 * @description 获取广告图
 * @returns
 */
export const findBanner = () => {
  return request({
    method: 'get',
    url: '/home/banner'
  })
}

/**
 * @description 获取新鲜好物
 * @returns
 */
export const findNew = () => {
  return request({
    method: 'get',
    url: 'home/new'
  })
}
