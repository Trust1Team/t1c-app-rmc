const helpers = {
  toRaw(obj) {
    return JSON.parse(JSON.stringify(obj))
  }
}

const install = app => {
  app.config.globalProperties.$h = helpers
}

export { install as default, helpers as helper }
