import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/profile',
    component: ProfileView,
    children: [
      { path: '', redirect: 'information' },
      {
        path: 'information',
        name: 'information',
        component: () => import('@/components/profile/MyInformation.vue'),
      },
      {
        path: 'signature',
        name: 'signature',
        component: () => import('@/components/profile/MySignature.vue'),
      },
      {
        path: 'security',
        name: 'security',
        component: () => import('@/components/profile/MySecurity.vue'),
      },
    ],
  },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
