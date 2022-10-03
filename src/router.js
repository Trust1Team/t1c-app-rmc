import { createRouter, createWebHistory } from 'vue-router';
import SideMenu from '@/components/layouts/side-menu/Main';
import Admin from './views/admin';
import Contact from './views/contact';
import Home from './views/home/Main';
import Download from './views/download/Main';
import Generic from './views/generic/Main';
import Settings from './views/settings/Main';
import ErrorPage from './views/error-page/Main';

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
