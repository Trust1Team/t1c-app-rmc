import { createRouter, createWebHistory } from 'vue-router'
import SideMenu from '../layouts/side-menu/Main.vue'
import Home from '../views/home/Main.vue'
import Download from '../views/download/Main.vue'
import Generic from '../views/generic/Main.vue'
import BeidModule from '../views/modules/beid/Main.vue'
import BeidView from '../views/modules/beid/BeidView.vue'
import CertignaModule from '../views/modules/certigna/Main.vue'
import CertignaView from '../views/modules/certigna/CertignaView.vue'
import CertinomisModule from '../views/modules/certinomis/Main.vue'
import CertinomisView from '../views/modules/certinomis/CertinomisView.vue'
import Admin from '../views/admin/Main.vue'
import Contact from '../views/contact/Main.vue'
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
        path: 'beid',
        name: 'side-menu-modules-beid',
        component: BeidModule
      },
      {
        path: 'beid/view',
        name: 'side-menu-modules-beid-view',
        component: BeidView
      },
      {
        path: 'certigna',
        name: 'side-menu-modules-certigna',
        component: CertignaModule
      },
      {
        path: 'certigna/view',
        name: 'side-menu-modules-certigna-view',
        component: CertignaView
      },
      {
        path: 'certinomis',
        name: 'side-menu-modules-certinomis',
        component: CertinomisModule
      },
      {
        path: 'certinomis/view',
        name: 'side-menu-modules-certinomis-view',
        component: CertinomisView
      },
      {
        path: 'contact',
        name: 'side-menu-contact',
        component: Contact
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
