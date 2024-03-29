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
          {
            icon: 'CreditCardIcon',
            pageName: 'side-menu-modules-beid',
            title: 'Belgian eID'
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
      },
      {
        icon: 'SettingsIcon',
        pageName: 'side-menu-settings',
        title: 'Settings'
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
