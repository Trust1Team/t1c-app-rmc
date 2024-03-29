import { createRouter, createWebHistory } from 'vue-router'
import SideMenu from '../layouts/side-menu/Main.vue'
import Home from '../views/home/Main.vue'
import Download from '../views/download/Main.vue'
import Generic from '../views/generic/Main.vue'
import Admin from '../views/admin/Main.vue'
import Contact from '../views/contact/Main.vue'
import Settings from '../views/settings/Main.vue'
import ErrorPage from '../views/_framework/error-page/Main'

const routes = [
  {
    path: '/',
    component: SideMenu,
    children: [
      {
        path: '/',
        name: 'side-menu-home',
        component: Home
      },
      {
        path: '/download',
        name: 'side-menu-download',
        component: Download
      },
      {
        path: '/generic',
        name: 'side-menu-generic',
        component: Generic
      },
      {
        path: 'admin',
        name: 'side-menu-admin',
        component: Admin
      },
      {
        path: 'modules',
        name: 'side-menu-modules',
        component: Home,
        children: [
          {
            path: 'beid',
            name: 'side-menu-modules-beid',
            component: Home
          }
        ]
      },
      {
        path: 'contact',
        name: 'side-menu-contact',
        component: Contact
      },
      {
        path: 'settings',
        name: 'side-menu-settings',
        component: Settings
      }
    ]
  },
  {
    path: '/error-page',
    name: 'error-page',
    component: ErrorPage
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

export default router
