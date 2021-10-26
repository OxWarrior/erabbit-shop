import request from '@/utils/request'
import axios from 'axios'
import { cityUrl, commentUrl } from '@/utils/config'

/**
 * @description 获取商品的详细数据
 * @param {*} id
 * @returns
 */
export const findGoods = (id) => {
  return request({
    method: 'get',
    url: '/goods',
    data: { id }
  })
}

/**
 * @description 获取城市列表
 * @returns
 */
export const getCityList = async () => {
  if (window.cityList) return window.cityList
  const res = await axios.get(cityUrl)
  if (res) {
    window.cityList = res.data // 页面缓存
    return res.data
  }
}

/**
 * 获取商品同类推荐-未传入ID为猜喜欢
 * @param {String} id - 商品ID
 * @param {Number} limit - 获取条数
 */
export const findRelGoods = (id, limit = 16) => {
  return request({
    method: 'get',
    url: '/goods/relevant',
    data: { id, limit }
  })
}

/**
 * 获取热榜商品
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜 3代表总热销榜
 * @param {Number} limit - 获取个数
 */
export const findHotGoods = ({ id, type, limit = 3 }) => {
  return request({
    method: 'get',
    url: '/goods/hot',
    data: { id, type, limit }
  })
}

/**
 * @description 获取商品评论的筛选条件数据
 * @param {*} id 参数id表示商品的id
 * @returns
 */
export const findCommentInfoByGoods = (id) => {
  return request({
    method: 'get',
    url: `${commentUrl}goods/${id}/evaluate`
  })
}

/**
 * @description 获取评论列表数据
 * @param {*} id 商品的id
 * @param {*} data 筛选条件
 * @returns
 */
export const findCommentListByGoods = (id, data) => {
  return request({
    method: 'get',
    url: `${commentUrl}goods/${id}/evaluate/page`,
    data
  })
}
