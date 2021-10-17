import { createStore } from 'vuex'

import global from './modules/global.js'
import cart from './modules/cart.js'
import cate from './modules/cate.js'
import user from './modules/user.js'

import createPersistedstate from 'vuex-persistedstate'

export default createStore({
  ...global,
  modules: {
    cart,
    cate,
    user
  },
  plugins: [
    createPersistedstate({
      key: 'erabbit-client-pc-store',
      paths: ['user', 'cart']
    })
  ]
})
