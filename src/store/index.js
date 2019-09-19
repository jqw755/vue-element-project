
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'


Vue.use(Vuex);
export default new Vuex.Store({
  // 公用状态变量
  state: {
    // 标签显示公司系统名称
    title: '',
    favicon: '',
  },
  mutations,
  actions
});
