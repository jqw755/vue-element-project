import Vue from 'vue'
import axios from 'axios'
// 导入API URL
import config from "./config";
import auth from "./auth";

axios.defaults.baseURL = config.getConfig().baseUrl;
axios.defaults.timeout = 60000;
// console.log( process.env.API_ROOT)

axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8;';
axios.defaults.headers.post['Accept-Language'] = 'zh-cn,zh;';

//请求拦截
axios.interceptors.request.use(config => {
  // 设置系统级的统一参数
  let accessToken = auth.getToken();
  // 系统级参数
  config.data = {
    token: accessToken || '',
    ...config.data
  };
  return config;
}, error => {
  // console.log('请求出错,测试下面的return promise.reject0');
  return Promise.reject(error);
});

//响应拦截
let needLogin = false; //单独针对登录进行拦截，避免页面提示多次 ’请重新登录‘；
axios.interceptors.response.use(response => {

  let code = response.data.code;
  // code = 0请求成功
  if (code === 0) {
    return Promise.resolve(response.data);
  }
  // 请求失败 code != 0
  else {
    response.data.message = response.data.msg;
    Vue.prototype.$message.error(response.data.msg);
    return Promise.reject(response.data);
  }
}, error => {
  if (error.message.indexOf('timeout') !== -1) {
    Vue.prototype.$message.error('请求超时，请重试');
    return
  }
  if (error.message.indexOf('404') !== -1) {
    Vue.prototype.$message.error('404，请求资源未找到，请稍后再试');
    return
  }
  if (error.message.indexOf('500') !== -1) {
    Vue.prototype.$message.error('500，服务端错误');
    return
  }
  Vue.prototype.$message.error('请求出错');
  return Promise.reject(error);
});

// 本项目所有接口暂定post方式请求
function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(response => {
      if (response.data.code === 0) {
        resolve(response.data)
      } else {
        response.data.message = response.data.msg;
        reject(response.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}


//导出调用
export default {post, get};
