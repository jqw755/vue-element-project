import en from './en';
import cn from './cn';
// 导入element ui的语言包，与i18n统一
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';

export default {
  en: {
    ...en,
    ...enLocale
  },
  cn: {
    ...cn,
    ...zhLocale
  }
}
