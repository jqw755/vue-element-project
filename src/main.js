import Vue from 'vue'
import App from './App'

// 先导入element-ui，防止打包后修改默认element样式无效
// element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/element-variables.scss'
// 覆盖element-ui的css文件
import './style/replace-element.scss'


import router from './router'

Vue.use(ElementUI);
// global store
import store from './store/index'
// 请求
import axios from './common/axios'
// global css
import './style/base.scss'

Vue.prototype.$api = axios;


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
