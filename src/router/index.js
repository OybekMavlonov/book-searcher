import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '../layout/MainLayout.vue'
import ViewDetail from '../components/ViewDetail.vue'
import Detail from '../pages/Detail.vue'
import UserAuth from "../pages/auth/UserAuth.vue";
import store from '../store/index.js'

const routes = [
  {
    path: "",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "index",
        redirect: '/auth',
      },
      {
        path: "/details",
        name: "details",
        component: Detail,
        meta: { requiresAuth: true }
      },
      {
        path: '/details/:id',
        name: "details-view",
        component: ViewDetail,
        props: true,
        meta: { requiresAuth: true }
      },
    ]
  },
  {
    path: "/auth",
    name: "auth",
    component: UserAuth,
    meta: { requiresUnAuth: true }
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  if(to.meta.requiresAuth && !store.getters.isAuthenticated){
    next('/auth')
  } else if(to.meta.requiresUnAuth && store.getters.isAuthenticated){
    next('/details')
  } else {
    next()
  }
})

export default router