// 用户信息模块
import { userAccountLogin, userMobileLoginMsg, userMobileLogin } from '@/api/user'

export default {
  namespaced: true,
  state: () => {
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    setUser (state, payload) {
      state.profile = payload
    }
  },
  actions: {
    // 验证码登录
    async mobileLogin (context, payload) {
      try {
        const res = await userMobileLogin(payload)
        if (res && res.result) {
          const { id, avatar, nickname, account, mobile, token } = res.result
          context.commit('setUser', { id, avatar, nickname, account, mobile, token })
          return true
        } else {
          return false
        }
      } catch {
        return false
      }
    },

    // 获取验证码
    async sendCode (context, payload) {
      try {
        const res = await userMobileLoginMsg(payload)
        if (res) {
          return true
        }
      } catch {
        return false
      }
    },

    // 账号登录
    async accountLogin (context, payload) {
      try {
        const res = await userAccountLogin(payload)
        if (res && res.result) {
          const { id, avatar, nickname, account, mobile, token } = res.result
          context.commit('setUser', { id, avatar, nickname, account, mobile, token })
          return true
        } else {
          return false
        }
      } catch {
        return false
      }
    }
  },
  getters: {

  }
}
