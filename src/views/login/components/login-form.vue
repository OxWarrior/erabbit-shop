<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="changeLogin(false)" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="changeLogin(true)" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form ref="target" class="form" v-slot='{ errors }'>
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field v-model="form.account" autocomplete='off' name="acount" :rules="schema.account" type="text" placeholder="请输入用户名或手机号" />
          </div>
          <div class="error" v-if="errors.acount"><i class="iconfont icon-warning" />{{errors.acount}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field v-model="form.password" autocomplete='off' name="password" :rules="schema.password" type="password" placeholder="请输入密码" />
          </div>
          <div class="error" v-if="errors.password"><i class="iconfont icon-warning" />{{errors.password}}</div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field v-model="form.mobile" autocomplete='off' name="mobile" :rules="schema.mobile" type="text" placeholder="请输入手机号" />
          </div>
          <div class="error" v-if="errors.mobile"><i class="iconfont icon-warning" />{{errors.mobile}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field v-model="form.code" autocomplete='off' name="code" :rules="schema.code" type="password" placeholder="请输入验证码" />
            <span class="code" @click="sendCode">{{time ? `${time}秒后再发送`:'发送验证码'}}</span>
          </div>
          <div class="error" v-if="errors.code"><i class="iconfont icon-warning" />{{errors.code}}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <!-- <XtxCheckbox v-model="form.isAgree" /> -->
          <Field as="XtxCheckbox" name="isAgree" :rules="schema.isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="errors.isAgree"><i class="iconfont icon-warning" />{{errors.isAgree}}</div>
      </div>
      <a @click="handleLogin" href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, getCurrentInstance } from 'vue'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'

export default {
  name: 'LoginForm',
  components: {
    Form, Field
  },
  setup () {
    // 是否短信登录
    const isMsgLogin = ref(false)
    // 表单数据
    const form = reactive({
      // 用户名
      account: null,
      // 密码
      password: null,
      // 手机号
      mobile: null,
      // 验证码
      code: null,
      // 是否同意
      isAgree: false
    })

    const target = ref(null)
    // 切换登录
    const changeLogin = (value) => {
      if (value) {
        isMsgLogin.value = value
      } else {
        isMsgLogin.value = value
      }
      // 清空表单
      for (const key in form) {
        if (key === 'isAgree') {
          form[key] = false
        } else {
          form[key] = null
        }
      }
      // 重置表单
      target.value.resetForm()
    }

    // 获取实例
    const instance = getCurrentInstance()
    const store = useStore()
    const router = useRouter()

    // 登录
    const handleLogin = async () => {
      const valid = await target.value.validate()
      if (!valid) {
        instance.proxy.$message({ type: 'error', text: '请进行填写和勾选' })
      } else {
        if (isMsgLogin.value) { // 账号登陆
          const res = await store.dispatch('user/mobileLogin', {
            mobile: form.mobile,
            code: form.code
          })
          if (res) {
            router.push('/')
            instance.proxy.$message({ type: 'success', text: '登陆成功' })
          } else {
            instance.proxy.$message({ type: 'error', text: '请输入正确的用户信息' })
          }
        } else { // 验证码登录
          const res = await store.dispatch('user/accountLogin', {
            account: form.account,
            password: form.password
          })
          if (res) {
            router.push('/')
            instance.proxy.$message({ type: 'success', text: '登陆成功' })
          } else {
            instance.proxy.$message({ type: 'error', text: '请输入正确的用户信息' })
          }
        }
      }
    }

    // 发送验证码
    const sendCode = async () => {
      const flag = schema.mobile(form.mobile)
      // 发送前进行表单验证，填写手机号才能发送
      if (flag !== true) {
        target.value.setFieldError('mobile', '请输入正确的手机号')
        return
      }
      // 开启倒计时
      if (time.value === 0) {
        time.value = 60
        resume()
      }
      // 调用发送验证码API
      const res = await store.dispatch('user/sendCode', form.mobile)
      if (res) {
        instance.proxy.$message(({ type: 'success', text: '发送验证码成功' }))
      } else {
        instance.proxy.$message({ type: 'error', text: '发送验证码失败' })
      }
    }

    // 倒计时
    // useIntervalFn(定时的回调，回调的时间间隔，控制回调的调用方式)
    // 参数三 {immediate: true, immediateCallback: false}
    // 3-1) immediate 首次运行useIntervalFn函数时，是否立刻开启定时任务（默认值true表示默认开启）
    // 3-2）immediateCallback 执行useIntervalFn函数立刻执行回调（在延时时间的前或者后调用），默认值是false，如果修改为true，表示为不延时，立刻启动定时任务（不要使用pause方法）
    // pause暂停；resume启动
    const time = ref(0)
    const { pause, resume } = useIntervalFn(() => {
      if (time.value > 0) {
        time.value--
      } else {
        pause()
      }
    }, 1000)

    return { isMsgLogin, form, schema, changeLogin, target, handleLogin, sendCode, time }
  }
}
</script>

<style lang="less" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
