import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message'

const container = document.createElement('div')
container.setAttribute('class', 'xtx-message-container')
document.body.appendChild(container)

export default ({ text, type }) => {
  // 创建虚拟节点
  const VNode = createVNode(XtxMessage, { text, type })

  // render函数渲染虚拟节点到dom容器
  render(VNode, container)

  // 一定时间间隔后移除组件,防抖
  let timer = null
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, container)
  }, 3000)
}
