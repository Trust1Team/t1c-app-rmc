import Tippy from './tippy/Main.vue'
import LoadingIcon from './loading-icon/Main.vue'
import * as featherIcons from '@zhuowenli/vue-feather-icons'

export default app => {
  app.component('Tippy', Tippy)
  app.component('LoadingIcon', LoadingIcon)

  for (const [key, icon] of Object.entries(featherIcons)) {
    icon.props.size.default = '24'
    app.component(key, icon)
  }
}
