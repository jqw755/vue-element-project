import Vue from 'vue'
import axios from 'axios'
import auth from '../common/auth'
// 导入API URL
import config from "./config";
import router from '../router/index';

import {CryptoJS} from "@/common/cryptoSecret"; // 登录aesj加密

axios.defaults.baseURL = config.getConfig().baseUrl;
axios.defaults.timeout = 60000;

// console.log( process.env.API_ROOT)

axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8;';
axios.defaults.headers.post['Accept-Language'] = 'zh-cn,zh;';

//请求拦截
axios.interceptors.request.use(config => {
  // pc端暂不做统一请求loading，需要时在单独的请求处手动添加即可
  // 设置系统级的统一参数
  let accessToken = auth.getToken();
  // 登录页去掉headers中的auth
  let isLoginPage = router.currentRoute.path === '/login';

  // 只有在登陆页面才携带cookie
  if(isLoginPage){
    axios.defaults.withCredentials = true; // 发送请求携带参数
  }

  // 登录接口、退出接口不需要在headers中加token
  if (!isLoginPage && accessToken) {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  // 动态设置超时时间
  if (config.data.timeOut) {
    axios.defaults.timeout = config.data.timeOut || 60000;
  }

  // 设置responseType，用来下载Excel等文件
  if (config.data.responseType) {
    config.responseType = config.data.responseType;
  }

  // 如果是Excel等文件上传，data中的uploadType为‘upload’，只取formData，去掉多去的sign appId等
  if (config.data.uploadType === 'upload') {
    config.data = config.data.formDataObj
  } else {
    // 系统级参数
    const reqAppId = "fb72c7cc77154c65b408c3e560ebd51e",
      nowDate = new Date().getTime(),
      decryptSign = auth.getDecryptSign();
    config.data = {
      appId: reqAppId,
      // sign: '',
      sign: CryptoJS.MD5(`${decryptSign}appId${reqAppId}data${JSON.stringify(config.data)}timestamp${nowDate}${decryptSign}`).toString(),
      timestamp: nowDate,
      data: {...config.data}
    };

  }
  return config;

}, error => {
  // console.log('请求出错,测试下面的return promise.reject0');
  return Promise.reject(error);
});

//响应拦截
let needLogin = false; //单独针对登录进行拦截，避免页面提示多次 ’请重新登录‘；
axios.interceptors.response.use(response => {
  // 检测到响应头中的content-type不是json，认为它是下载文件的，此时后台不返回code
  if (response.headers['content-disposition'] && response.headers['content-disposition'].indexOf('fileName') !== -1) {
    let downFile = {
      contentType: response.headers['content-type'],
      fName: response.headers['content-disposition'].split('fileName=')[1],
      data: response.data
    };
    return Promise.resolve({data: downFile})
  }
  let code = response.data.code;
  // code = 0请求成功
  if (code === 0) {
    return Promise.resolve(response.data);
  }
  // 请求失败 code != 0
  else {
    // 缺少token或者token失效，重新登录
    if ((code === 20 || code === 21) && !needLogin) {
      needLogin = true;
      auth.setIsLogin(0); //设置未登录状态

      // 先留着userType，之后再清除本地的
      const userType = auth.getUserType();

      auth.removeToken();

      Vue.prototype.$confirm(`登录超时，请重新登录`, '提示', {
        type: 'warning'
      }).then(() => {
        router.push({
          path: "/login",
          query: {
            redirect: router.currentRoute.fullPath,
            userType: userType
          }
        })
      }).catch(() => {
      }).finally(e => {
        needLogin = false
      });

      return Promise.reject(response.data);
    }
    if (!needLogin) {
      // 导出文件失败，将blob转换json，并弹出错误提示
      if(response.data && response.data.type && response.data.type.includes('application/json')){
        const reader = new FileReader();
        reader.readAsText(response.data, 'utf-8');
        reader.onload = () => {
          const result = JSON.parse(reader.result);
          Vue.prototype.$message.error(result.msg);
        }
        return;
      }
      
      response.data.message = response.data.msg;
      Vue.prototype.$message.error(response.data.msg);
      return Promise.reject(response.data);
    }
  }
}, error => {
  // console.log('响应出错,测试下面的return promise.reject1');
  // console.log(error.message);
  if (error.message.indexOf('timeout') !== -1) {
    Vue.prototype.$message.error('请求超时，请重试');
    return
  }
  if (error.message.indexOf('404') !== -1) {
    Vue.prototype.$message.error('请求资源未找到，请稍后再试');
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

// 上面post方法的升级版，可以以key=value的形式传递更多参数，比如 headers
function postReq({url = '', data = {}, headers = {}}) {
  return new Promise((resolve, reject)=>{
    axios({method: "post", url, data, headers})
      .then(res=>{
        resolve(res.data)
      }).catch(e => {
       reject(e)
    });
  })
}

//导出调用
export default {post, postReq};
