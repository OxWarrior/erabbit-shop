<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{active:isShow}">
      <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
      <span v-else class="value">{{fullLocation}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show='isShow'>
      <template v-if="resultList.length">
        <span @click="changeCity(item)" class="ellipsis" v-for="item in resultList" :key="item.code">{{item.name}}</span>
      </template>
      <div v-else class="loading"></div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { getCityList } from '@/api/product'

export default {
  name: 'XtxCity',
  props: {
    fullLocation: { // 用户完整地址
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const isShow = ref(false) // 控制弹层显示隐藏

    const list = ref([]) // 城市数据
    // 点击切换显示和隐藏弹层
    const toggle = () => {
      isShow.value = !isShow.value
      if (isShow.value) {
        getCityList().then(res => {
          list.value = res
        })
      }
      // 关闭弹层后清空数据
      for (const key in changeResult) {
        changeResult[key] = ''
      }
    }
    const target = ref(null)
    // 点击外面隐藏弹层
    onClickOutside(target, () => {
      isShow.value = false
    })

    // 选中的省市区
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })
    // 控制城市的点击操作
    const changeCity = (city) => {
      if (city.level === 0) {
        // 选中省
        changeResult.provinceCode = city.code
        changeResult.provinceName = city.name
      } else if (city.level === 1) {
        // 选中市
        changeResult.cityCode = city.code
        changeResult.cityName = city.name
      } else {
        // 选中区
        changeResult.countyCode = city.code
        changeResult.countyName = city.name
        isShow.value = false // 关闭弹层
        // 把最终选择的省市区数据传递给父组件
        changeResult.fullLocation = `${changeResult.provinceName}${changeResult.cityName}${changeResult.countyName}`
        emit('change-address', changeResult)
      }
    }
    //
    const resultList = computed(() => {
      let result = list.value
      // 选中省
      if (changeResult.provinceCode && changeResult.provinceName) {
        result = list.value.find(item => item.code === changeResult.provinceCode).areaList
      }
      // 选中市
      if (changeResult.cityCode && changeResult.cityName) {
        result = result.find(item => item.code === changeResult.cityCode).areaList
      }
      return result
    })

    return {
      isShow,
      target,
      resultList,
      toggle,
      changeCity
    }
  }
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading { // 加载中显示
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
