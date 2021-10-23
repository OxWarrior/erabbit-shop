import request from '@/utils/request'
import axios from 'axios'
import { cityUrl } from '@/utils/config'

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
