<template>
  <div class="goods-sku">
    <dl v-for="(item,index) in specs" :key="index">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="(tag,i) in item.values" :key="i">
          <img :class="{selected:tag.selected,disabled:tag.disabled}" @click="toggle(tag,item.values)" v-if="tag.picture" :src="tag.picture" alt="">
          <span :class="{selected:tag.selected,disabled:tag.disabled}" @click="toggle(tag,item.values)" v-else>{{tag.name}}</span>
        </template>
      </dd>
    </dl>

  </div>
</template>

<script>
import powerSet from '@/vendor/power-set.js'

const spliter = '⭐' // 拼接的链接符
// 组合路径字典
const usePathMap = (skus) => {
  // 路径字典
  const pathMap = {}
  skus.forEach(sku => {
    // 排除库存为空的
    if (sku.inventory === 0) return
    // 规格组合 ["蓝色","日本","30cm"]
    const specs = sku.specs.map(item => item.valueName)
    // 笛卡尔集 -- 通过power-set算法得到二维数组的所有可能集合
    const subsets = powerSet(specs)
    // 路径字典
    subsets.forEach(item => {
      // 排除空集
      if (item.length === 0) return
      // 把每一个组合转换成字符串 -- 路径字典的key
      const pathKey = item.join(spliter)
      // 判断集合存在则再次添加id 可重复
      if (pathMap[pathKey]) {
        pathMap[pathKey].push(sku.id)
      } else { // 不存在则只是一个数组包含id
        pathMap[pathKey] = [sku.id]
      }
    })
  })
  return pathMap
}

// 获取选中的所有规格的值
const getSelectedValues = (specs) => {
  // 选中的值 初始为[undefined,undefined,undefined]
  const result = []

  specs.forEach((spec, index) => {
    const tag = spec.values.find(tag => tag.selected)
    if (tag) {
      // 有选中为选中的 name
      result[index] = tag.name
    } else {
      // 无选中为 undefined
      result[index] = undefined
    }
  })

  return result
}

// 修改规格的状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((spec, index) => {
    // 获取所有规格的值 [undefined,undefined,undefined] -- ["蓝色",undefined,undefined]
    const selectedValues = getSelectedValues(specs)

    spec.values.forEach(tag => {
      if (!tag.selected) { // 判断所有标签选中，没有选中模拟选中，否则会全部显示禁用
        selectedValues[index] = tag.name
      } else {
        return
      }
      // 得到选中的有效值
      const validValues = selectedValues.filter(item => item)
      // 形成选中的key与路径字典比较
      const key = validValues.join(spliter)
      // 路径字典中存在这个key -- 不禁用
      tag.disabled = !pathMap[key]
    })
  })
}

// 根据skuId控制规格的默认选中
const initSkuSeletedStatus = (skuId, specs, skus) => {
  // 获取需要被选中的规格
  const targetSpecs = skus.find(item => item.id === skuId).specs

  specs.forEach(spec => {
    // 获取需要选中的规格的名称
    const targetName = targetSpecs.find(item => item.name === spec.name).valueName
    // 获取 使规格选中
    const tag = spec.values.find(item => item.name === targetName)
    if (tag) {
      tag.selected = true
    }
  })
}

export default {
  name: 'GoodsSku',
  props: {
    specs: {
      type: Array,
      default: () => []
    },
    skus: {
      type: Array,
      default: () => []
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 初始化默认状态
    if (props.skuId) {
      initSkuSeletedStatus(props.skuId, props.specs, props.skus)
    }

    // 得到路径字典
    const pathMap = usePathMap(props.skus)
    // console.log(pathMap)

    // 初始化判断每个规格禁用状态
    updateDisabledStatus(props.specs, pathMap)

    // 控制标签的选中和反选
    const toggle = (tag, list) => {
      if (tag.disabled) return
      // 点击切换选中状态
      tag.selected = !tag.selected
      list.forEach(item => { // 排除不包含当前选中项的其他置false
        if (item.selected && item.name !== tag.name) {
          item.selected = false
        }
      })
      // console.log(getSelectedValues(props.specs))
      // 选中再次判断规格禁用状态
      updateDisabledStatus(props.specs, pathMap)

      // 判断所有规格的选中
      // 排除选中时undefined
      const selectedValues = getSelectedValues(props.specs).filter(item => item)
      if (selectedValues.length === props.specs.length) { // 必须三个全选中才传值
        // 全部选中了
        // 根据选中找到skus中的那一项得到其他信息子传父
        const targetKey = selectedValues.join(spliter)
        // 路径字典中找到skuId
        const skuId = pathMap[targetKey][0]
        // 根据id找到整体信息
        const skuInfo = props.skus.find(item => item.id === skuId)
        // 购物车信息
        const specText = skuInfo.specs.reduce((result, item) => result + item.name + ':' + item.valueName + ' ', '')
        const result = {
          skuId: skuId,
          price: skuInfo.price,
          oldPrice: skuInfo.oldPrice,
          inventory: skuInfo.inventory,
          specText: specText
        }
        emit('update-sku', result)
      } else {
        // 没有全部选中
        emit('update-sku', null)
      }
    }

    return {
      toggle
    }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
