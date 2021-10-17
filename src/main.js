import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入重置样式文件（屏蔽浏览器之间的样式差异）
import 'normalize.css'
import '@/styles/common.less'

import XtxUI from '@/components/library'

createApp(App).use(store).use(router).use(XtxUI).mount('#app')
