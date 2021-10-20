import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/layout')
const Home = () => import('@/views/home')
const Login = () => import('@/views/login')
const Test = () => import('@/views/test')
const TopCategory = () => import('@/views/category')
const SubCategory = () => import('@/views/category/sub')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory }
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
  routes
})

export default router
