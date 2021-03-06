// import XtxSkeleton from './xtx-skeleton'
// import XtxCarousel from './xtx-carousel'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'

import defaultImage from '@/assets/images/200.png'

import Message from './Message'

const importFn = require.context('./', false, /\.vue$/)
// 匹配目录 是否匹配子文件 正则判断
// console.dir(importFn)

// 自定义事件
const defineDirective = (app) => {
  app.directive('lazyimg', {
    mounted (el, bindings) {
      // 图片进入可视区后，动态加载图片信息 // isIntersecting 判断被监听的元素是否已经进入可视区
      const observer = new IntersectionObserver(([{ isIntersecting }], observer) => {
        // entries = [{isIntersecting: true}]

        if (isIntersecting) {
          el.src = bindings.value

          // 加载失败显示默认图片
          observer.onerror = () => {
            el.src = defaultImage
          }
          // 加载成功解绑事件
          observer.onload = () => {
            observer.unobserve(el)
          }
        }
      }, {
        threshold: 0.01 // threshold 容器和可视区交叉的占比（进入的面积/容器完整面积） 取值
      })
      observer.observe(el) // 注意绑定需要的元素
    }
  })
}

export default {
  install (app) {
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)

    importFn.keys().forEach(file => {
      const component = importFn(file).default // 每一个组件
      app.component(component.name, component)
    })

    defineDirective(app)

    // 添加到vue实例
    app.config.globalProperties.$message = Message
  }
}
