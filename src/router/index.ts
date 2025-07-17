import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

import Recruitment from '@/views/Recruitment.vue'
import SampleView from '@/views/SampleView.vue'
import JobDetail from '@/views/JobDetail.vue' // ✅ Import Job Detail view
import DefaultLayout from '@/layouts/DefaultLayout.vue' // 🔁📦 Layout with HeaderView
import CreateJob from '@/views/Jobs/CreateJob.vue'

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
        },
        {
          path: 'job',
          name: 'job',
          component: CreateJob,
        },
        {
          path: 'sample',
          name: 'sample',
          component: SampleView,
        },
      ],
    },

    // 🔹 Separate route for Job Detail — uses its own full-screen layout
    {
      path: '/recruitment/:id',
      name: 'job-detail',
      component: JobDetail, // no DefaultLayout — clean layout
      props: true // allows passing :id as prop
    },
  ],
})

export default router
