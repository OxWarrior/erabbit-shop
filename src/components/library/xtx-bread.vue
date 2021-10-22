<script>
// import { h } from 'vue'
export default {
  name: 'XtxBread',

  render () {
    // 获取插槽内容
    const slotContent = this.$slots.default().filter(item => typeof item.type !== 'symbol') // 筛选注释
    const dymanicItems = [] // 动态数组

    slotContent.forEach((item, index) => {
      dymanicItems.push(item) // 先添加每一项
      if (index < slotContent.length - 1) { // 如果不是最后一项，添加图标
        // const i = h('i', { class: 'iconfont icon-angle-right' }, null)
        dymanicItems.push(<i className="iconfont icon-angle-right"></i>)
      }
    })
    // render函数（节点名称，属性|数据，子节点）
    // return h('div', { class: 'xtx-bread' }, dymanicItems)
    // JSX
    return <div className="xtx-bread">{dymanicItems}</div>
  }
}
</script>

<style scoped lang='less'>
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  :deep(&-item) {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  :deep(i) {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
