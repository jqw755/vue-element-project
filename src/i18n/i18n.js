import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './langs'
import ElementLocale from 'element-ui/lib/locale';

Vue.use(VueI18n);
//从localStorage中拿到用户的语言选择，如果没有，那默认中文。
const i18n = new VueI18n({
  locale: localStorage.getItem('EMSP_LANG') || 'cn',
  messages,
});
ElementLocale.i18n((key, value) => i18n.t(key, value));

export default i18n;



