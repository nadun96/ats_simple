import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AppBarMain from '@/components/header/AppBarMain.vue'
import SampleView from '@/views/SampleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/app',
      name: 'appbar',
      component: AppBarMain,
    },
    {
      path: '/sample',
      name: 'samplePage',
      component: SampleView,
    },
  ]
})


export default router
