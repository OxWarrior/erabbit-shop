<template>
  <p class="g-name">{{goods.name}}</p>
  <p class="g-desc">{{goods.desc}}</p>
  <p class="g-price">
    <span>{{goods.price}}</span>
    <span>{{goods.oldPrice}}</span>
  </p>
  <div class="g-service">
    <dl>
      <dt>促销</dt>
      <dd>12月好物放送，App领券购买直降120元</dd>
    </dl>
    <dl>
      <dt>配送</dt>
      <dd>至
        <XtxCity :fullLocation="fullLocation" @change-address="changeAddress"></XtxCity>
      </dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href="javascript:;">了解详情</a>
      </dd>
    </dl>
  </div>
</template>

<script>
import { toRef, ref } from 'vue'

export default {
  name: 'GoodName',
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    // 实现默认地址的获取
    // 如果有默认地址就获取默认即可，如果没有默认地址就获取第一个地址
    const userAddresses = toRef(props, 'userAddresses')
    const provinceCode = ref('110000')
    const cityCode = ref('119900')
    const countyCode = ref('110101')
    const fullLocation = ref('北京市 市辖区 东城区')

    // 判断用户地址
    if (userAddresses.value && userAddresses.value.length) {
      const address = userAddresses.value.find(item => item.isDefault === 1)
      if (address) {
        // 有默认地址
        provinceCode.value = address.provinceCode
        cityCode.value = address.cityCode
        countyCode.value = address.countyCode
        fullLocation.value = address.fullLocation
      } else {
        // 没有默认地址用第一个
        provinceCode.value = userAddresses.value[0].provinceCode
        cityCode.value = userAddresses.value[0].cityCode
        countyCode.value = userAddresses.value[0].countyCode
        fullLocation.value = userAddresses.value[0].fullLocation
      }
    }

    // 修改城市信息
    const changeAddress = (result) => {
      provinceCode.value = result.provinceCode
      cityCode.value = result.cityCode
      countyCode.value = result.countyCode
      fullLocation.value = result.fullLocation
    }

    return { fullLocation, changeAddress }
  }
}
</script>

<style lang="less" scoped>
.g-name {
  font-size: 22px;
}
.g-desc {
  color: #999;
  margin-top: 10px;
}
.g-price {
  margin-top: 10px;
  span {
    &::before {
      content: '¥';
      font-size: 14px;
    }
    &:first-child {
      color: @priceColor;
      margin-right: 10px;
      font-size: 22px;
    }
    &:last-child {
      color: #999;
      text-decoration: line-through;
      font-size: 16px;
    }
  }
}
.g-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 10px;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      &:last-child {
        span {
          margin-right: 10px;
          &::before {
            content: '•';
            color: @xtxColor;
            margin-right: 2px;
          }
        }
        a {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
