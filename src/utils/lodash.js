// TODO cleanup heavy library, import only what is required.
import _ from 'lodash'

const install = app => {
  app.config.globalProperties.$_ = _
}

export { install as default }
