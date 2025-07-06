// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '@/views/HomeView.vue'
// import AppBarMain from '@/components/header/AppBarMain.vue'
// import Recruitment from '@/views/Recruitment.vue'


// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView,
//     },
//     {
//       path: '/app',
//       name: 'appbar',
//       component: AppBarMain,
//     },
//     {
//       path: '/recruitment',
//       name: 'recruitment',
//       component: Recruitment,
//     },
//   ]
// })


// export default router


import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Recruitment from '@/views/Recruitment.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue' // 🔁 Add this layout wrapper

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout, // 🧩 HeaderView is inside this layout
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
    }
  ]
})

export default router
