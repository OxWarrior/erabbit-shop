import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

export const useLazyData = (apiFn) => {
  //
  const results = ref([])

  const target = ref(null)
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    // 判断被监听的元素是否已经进入可视区
    if (isIntersecting) {
      apiFn().then(data => {
        results.value = data.result
      })
      // 如果获取到了数据，可以取消继续监听
      stop()
    }
  }, {
    threshold: 0 // threshold 容器和可视区交叉的占比（进入的面积/容器完整面积） 取值
  })

  return {
    target,
    results
  }
}
