import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

import Recruitment from '@/views/Recruitment.vue'
import JobDetail from '@/views/JobDetail.vue' // ✅ Import Job Detail view
import DefaultLayout from '@/layouts/DefaultLayout.vue' // 📦 Layout with HeaderView

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout, // ⬅️ Wrap all routes that use HeaderView
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'recruitment',
          name: 'recruitment',
          component: Recruitment,
        }
      ]
    },

    // 🔹 Separate route for Job Detail — uses its own full-screen layout
    {
      path: '/recruitment/:id',
      name: 'job-detail',
      component: JobDetail, // no DefaultLayout — clean layout
      props: true // allows passing :id as prop
    }
  ]
})

export default router
