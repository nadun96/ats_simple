import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'

import Recruitment from '@/views/RecruitmentView.vue'
import SampleView from '@/views/SampleView.vue'
import JobDetail from '@/views/JobDetail.vue'
import CreateJob from '@/views/Jobs/CreateJob.vue'
import EditJob from '@/views/Jobs/EditJob.vue'
import JobAdPreview from '@/views/Jobs/JobAdPreview.vue'
import ProfileView from '@/views/ProfileView.vue'
import MyInformation from '@/components/profile/MyInformation.vue'
import MySignature from '@/components/profile/MySignature.vue'
import MySecurity from '@/components/profile/MySecurity.vue'
import MyNotifications from '@/components/profile/MyNotifications.vue'
import MyCalendar from '@/components/profile/MyCalendar.vue'
import CandidatesView from '@/views/CandidatesView.vue'
import CandidateDetail from '@/views/CandidateDetail.vue'
import CreateCandidateView from '@/views/CreateCandidateView.vue'

// Import auth and public views
import LoginView from '@/views/auth/LoginView.vue'
import SignupView from '@/views/auth/SignupView.vue'
import PublicJobsView from '@/views/public/PublicJobsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public routes (no authentication required)
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      meta: { requiresAuth: false }
    },
    {
      path: '/jobs',
      name: 'public-jobs',
      component: PublicJobsView,
      meta: { requiresAuth: false }
    },

    // Protected routes (require authentication)
    {
      path: '/',
      component: DefaultLayout,
      meta: { requiresAuth: true },
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
          path: 'job/:id/edit',
          name: 'edit-job',
          component: EditJob,
          props: true,
        },
        {
          path: 'job/preview',
          name: 'job-ad-preview',
          component: JobAdPreview,
        },
        {
          path: 'sample',
          name: 'sample',
          component: SampleView,
        },


        {
          path: 'analysis',
          name: 'analysis',
          component: () => import('@/views/AnalysisView.vue'),
        },

        // 🔹 Candidate routes
        {
          path: 'candidates',
          name: 'candidates',
          component: CandidatesView,
        },
        {
          path: 'candidates/create',
          name: 'create-candidate',
          component: CreateCandidateView,
        },
        {
          path: 'candidates/:id',
          name: 'candidate-detail',
          component: CandidateDetail,
          props: true,
        },

        // 🔹 Profile routes - moved inside DefaultLayout
        {
          path: 'profile',
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
            {
              path: 'notifications',
              name: 'notifications',
              component: MyNotifications,
            },
            {
              path: 'calendar',
              name: 'calendar',
              component: MyCalendar,
            },
          ],
        },
      ],
    },

    // 🔹 Separate route for Job Detail — uses its own full-screen layout
    {
      path: '/recruitment/:id',
      name: 'job-detail',
      component: JobDetail, // no DefaultLayout — clean layout
      meta: { requiresAuth: true },
      props: true, // allows passing :id as prop
    },
  ],
})

// Add navigation guards for debugging
router.beforeEach((to, from, next) => {
  console.log('Router navigation:', { from: from.path, to: to.path, toName: to.name })
  next()
})

router.afterEach((to, from) => {
  console.log('Router navigation completed:', { from: from.path, to: to.path, toName: to.name })
})

export default router
