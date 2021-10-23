import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/layout')
const Home = () => import('@/views/home')
const Login = () => import('@/views/login')
const Test = () => import('@/views/test')
const TopCategory = () => import('@/views/category')
const SubCategory = () => import('@/views/category/sub')
const Product = () => import('@/views/goods')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Product }

    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/test',
    component: Test
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior () { // 路由切换回顶
    return {
      top: 0,
      left: 0
    }
  }
})

export default router
