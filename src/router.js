// Vue Routerパッケージのインポート
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/Base/HomePage.vue'
import ProjectDetail from './components/Base/ProjectDetail.vue'

const routes = [
  {
    path: '/portfolio-frontend/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    props: true,
    component: ProjectDetail
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
