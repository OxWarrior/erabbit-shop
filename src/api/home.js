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

/**
 * @description 人气推荐
 * @returns
 */
export const findHot = () => {
  return request({
    method: 'get',
    url: 'home/hot'
  })
}

/**
 * @description 获取商品信息
 * @returns
 */
export const findGoods = () => {
  return request({
    method: 'get',
    url: 'home/goods'
  })
}
