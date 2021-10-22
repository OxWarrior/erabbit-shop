<template>
  <!-- 复选框 -->
  <!-- <div class="xtx-checkbox" @click="changeChecked()"> -->
  <div class="xtx-checkbox" @click="checked = !checked">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default">
      <slot />
    </span>
  </div>
</template>
<script>
// import { toRef } from 'vue'
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // 获取父组件传递过来的modelValue的值
    const checked = useVModel(props, 'modelValue', emit)

    return {
      checked
    }
  }
  // setup (props, { emit }) {
  //   // const checked = ref(false)
  //   const checked = toRef(props, 'modelValue')
  //   const changeChecked = () => {
  //     // checked.value = !checked.value
  //     emit('update:modelValue', !checked.value)
  //   }
  //   return { checked, changeChecked }
  // }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
