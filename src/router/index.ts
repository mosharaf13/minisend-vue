import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "email",
    component: () => import("@/views/layout/Layout.vue"),
    children: [
      {
        path: "/email",
        name: "email",
        component: () => import("@/views/emails/List.vue"),
      },
      {
        path: "/email/:email_id",
        name: "show-email",
        component: () =>
            import("@/views/emails/Show.vue"),
      }
    ],
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
