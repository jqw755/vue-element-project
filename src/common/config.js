//测试部署环境： http://emsp-test.chargerhere.net/

const config = {
  active: 'dev',
  companyName: '电享',
  companyFullName: '上海电享信息科技有限公司',
  companyLogo: '',
  hashKey: '20f43b14a64251a689595b44a437f85f366a0b97',
  amapKey: '187aa89c11c8426690d6a5273a04d046',  //高德地图Key
  globalImgUrl: 'http://emsp-test.chargerhere.net/img/', // 静态图片地址域名
  dev: {
    // baseUrl: 'http://localhost:8084/api',
    baseUrl: 'http://ps-internal96.chargerhere.net:1111/emsp/',
    // baseUrl: 'http://192.168.10.177:21000', // zw ip
    // baseUrl: 'http://192.168.10.112:21000', // yy ip
    // baseUrl: 'http://192.168.10.95:21000', // yt ip
    // baseUrl: 'http://192.168.1.102:21000', // 鹏飞 ip
    serverUrl: '/',
  },
  test: {
    baseUrl: 'https://emsp-api-uat.chargerhere.net/',
    // baseUrl: 'https://emsp-api-pre.chargerhere.net/',
    serverUrl: '/',
  },
  pro: {
    baseUrl: 'https://emsp-api.chargerhere.net/',
    serverUrl: '/',
  },
  getConfig() {
    return config[config.active];
  }
};

// export {getConfig};
export default config;
