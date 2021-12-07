const state = () => {
  return {
    menu: [
      {
        icon: 'HomeIcon',
        pageName: 'side-menu-home',
        title: 'Home'
      },
      {
        icon: 'BoxIcon',
        pageName: 'side-menu-modules',
        title: 'Modules',
        subMenu: [
          // {
          //   icon: 'CreditCardIcon',
          //   pageName: 'side-menu-modules-beid',
          //   title: 'Belgian eID'
          // },
          // {
          //   icon: 'CreditCardIcon',
          //   pageName: 'side-menu-modules-certigna',
          //   title: 'Certigna'
          // },
          // {
          //   icon: 'CreditCardIcon',
          //   pageName: 'side-menu-modules-certinomis',
          //   title: 'Certinomis'
          // },
          {
            icon: 'CreditCardIcon',
            pageName: 'side-menu-modules-ids',
            title: 'ID/Token modules'
          },
          {
            icon: 'CreditCardIcon',
            pageName: 'side-menu-modules-payment',
            title: 'Payment modules'
          },
          {
            icon: 'CreditCardIcon',
            pageName: 'side-menu-modules-pki',
            title: 'PKI modules'
          },
          {
            icon: 'CreditCardIcon',
            pageName: 'side-menu-modules-remote-loading',
            title: 'Remote loading modules'
          },
          {
            icon: 'CreditCardIcon',
            pageName: 'side-menu-modules-transport',
            title: 'Transport modules'
          },
          {
            icon: 'CreditCardIcon',
            pageName: 'side-menu-modules-file-exchange',
            title: 'File-exchange module'
          },
          {
            icon: 'CreditCardIcon',
            pageName: 'side-menu-modules-other-modules',
            title: 'Other modules'
          }
        ]
      },
      {
        icon: 'HardDriveIcon',
        pageName: 'side-menu-admin',
        title: 'Admin'
      },
      'devider',
      {
        icon: 'InboxIcon',
        pageName: 'side-menu-contact',
        title: 'Contact'
      }
    ]
  }
}

// getters
const getters = {
  menu: state => state.menu
}

// actions
const actions = {}

// mutations
const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
