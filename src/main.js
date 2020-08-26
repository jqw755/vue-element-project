import Vue from 'vue'
import App from './App'

// 先导入element-ui，防止打包后修改默认element样式无效
// element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/element-variables.scss'
// 覆盖element-ui的css文件
import './style/replace-element.scss'

// 国际化
import i18n from './i18n/i18n';

import router from './router'

Vue.use(ElementUI);
// global store
import store from './store/index'
// 请求
import axios from './common/axios'
// global css
import './style/base.scss'

import PowershareUI from 'powershare-ui' // 引入组件库
import 'powershare-ui/dist/powershare-ui.css' // 引入样式库

Vue.use(PowershareUI)

Vue.prototype.$api = axios;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {App},
  template: '<App/>'
});
