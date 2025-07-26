import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

import Recruitment from '@/views/RecruitmentView.vue'
import SampleView from '@/views/SampleView.vue'
import JobDetail from '@/views/JobDetail.vue'
import CreateJob from '@/views/Jobs/CreateJob.vue'
import ProfileView from '@/views/ProfileView.vue'
import MyInformation from '@/components/profile/MyInformation.vue'
import MySignature from '@/components/profile/MySignature.vue'
import MySecurity from '@/components/profile/MySecurity.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
      props: true, // allows passing :id as prop
    },

    {
      path: '/profile',
      component: ProfileView,
      children: [
        { path: '', redirect: 'information' },
        {
          path: 'information',
          name: 'information',
          component: MyInformation,
        },
        {
          path: 'signature',
          name: 'signature',
          component: MySignature,
        },
        {
          path: 'security',
          name: 'security',
          component: MySecurity,
        },
      ],
    },
  ],
})

export default router
