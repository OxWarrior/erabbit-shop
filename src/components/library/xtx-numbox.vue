<template>
  <div class="xtx-numbox">
    <div class="label">
      <slot />
    </div>
    <div class="numbox">
      <a @click="toggle(-1)" href="javascript:;">-</a>
      <input type="text" readonly :value="modelValue">
      <a @click="toggle(1)" href="javascript:;">+</a>
    </div>
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core'

export default {
  name: 'XtxNumbox',
  props: {
    max: {
      type: Number,
      required: true
    },
    modelValue: {
      type: Number,
      default: 1
    }
  },
  setup (props, { emit }) {
    const count = useVModel(props, 'modelValue', emit)
    const toggle = (n) => {
      if (n > 0 && n <= props.max) {
        // emit('update:modelValue', props.modelValue + 1)
        count.value++
      } else {
        if (count.value > 1) {
          // emit('update:modelValue', props.modelValue - 1)
          count.value--
        }
      }
    }
    return {
      toggle
    }
  }

}
</script>

<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
