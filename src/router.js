import { createRouter, createWebHistory } from 'vue-router';
import SideMenu from '@/components/layouts/side-menu/Main';
import Admin from './views/admin';
import Contact from './views/contact';
import Download from './views/download';
import ErrorPage from './views/error-page';
import Generic from './views/generic';
import Home from './views/home';
import Settings from './views/settings';
import { createRouter, createWebHistory } from 'vue-router'
import SideMenu from '../layouts/side-menu/Main.vue'
import Home from '../views/home/Main.vue'
import Download from '../views/download/Main.vue'
import Generic from '../views/generic/Main.vue'
// import BeidModule from '../views/modules/beid/Main.vue'
// import BeidView from '../views/modules/beid/BeidView.vue'
// import CertignaModule from '../views/modules/certigna/Main.vue'
// import CertignaView from '../views/modules/certigna/CertignaView.vue'
// import CertinomisModule from '../views/modules/certinomis/Main.vue'
// import CertinomisView from '../views/modules/certinomis/CertinomisView.vue'
// import IdModules from '../views/modules/Ids.vue'
// import PaymentModules from '../views/modules/Payment.vue'
// import PkiModules from '../views/modules/Pki.vue'
// import RemoteLoadingModules from '../views/modules/RemoteLoading.vue'
// import TransportModules from '../views/modules/Transport.vue'
// import FileExchangeModules from '../views/modules/FileExchange.vue'
// import OtherModules from '../views/modules/Other.vue'

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
          // ,
          // {
          //   path: 'modules/pki/beid',
          //   name: 'side-menu-modules-beid',
          //   component: BeidModule
          // },
          // {
          //   path: 'modules/pki/beid/view',
          //   name: 'side-menu-modules-beid-view',
          //   component: BeidView
          // },
          // {
          //   path: 'modules/pki/certigna',
          //   name: 'side-menu-modules-certigna',
          //   component: CertignaModule
          // },
          // {
          //   path: 'modules/pki/certigna/view',
          //   name: 'side-menu-modules-certigna-view',
          //   component: CertignaView
          // },
          // {
          //   path: 'modules/pki/certinomis',
          //   name: 'side-menu-modules-certinomis',
          //   component: CertinomisModule
          // },
          // {
          //   path: 'modules/pki/certinomis/view',
          //   name: 'side-menu-modules-certinomis-view',
          //   component: CertinomisView
          // },
          // {
          //   path: 'modules/ids',
          //   name: 'side-menu-modules-ids',
          //   component: IdModules
          // },
          // {
          //   path: 'modules/payment',
          //   name: 'side-menu-modules-payment',
          //   component: PaymentModules
          // },
          // {
          //   path: 'modules/pki',
          //   name: 'side-menu-modules-pki',
          //   component: PkiModules
          // },
          // {
          //   path: 'modules/remote-loading',
          //   name: 'side-menu-modules-remote-loading',
          //   component: RemoteLoadingModules
          // },
          // {
          //   path: 'modules/transport',
          //   name: 'side-menu-modules-transport',
          //   component: TransportModules
          // },
          // {
          //   path: 'modules/file-exchange',
          //   name: 'side-menu-modules-file-exchange',
          //   component: FileExchangeModules
          // },
          // {
          //   path: 'modules/other-modules',
          //   name: 'side-menu-modules-other-modules',
          //   component: OtherModules
          // },
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
