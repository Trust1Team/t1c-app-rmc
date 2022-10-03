const INITIAL_STATE = {
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

export default {
  namespaced: true,
  state: INITIAL_STATE,
  mutations: {},
  actions: {},
  getters: {
    menu: state => state.menu
  },
}
