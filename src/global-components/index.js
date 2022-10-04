import Tippy from './tippy/Main.vue';
import * as featherIcons from '@zhuowenli/vue-feather-icons';

export default app => {
  app.component('Tippy', Tippy);

  for (const [key, icon] of Object.entries(featherIcons)) {
    icon.props.size.default = '24';
    app.component(key, icon);
  }
}
