const config = {
  active: 'dev',
  dev: {
   baseUrl: 'http://192.168.1.127:8088',
  //    baseUrl: 'http://localhost:8089/api',
    serverUrl: '/',
  },
  test: {
    baseUrl: '',
    serverUrl: '/',
  },
  pro: {
    baseUrl: '',
    serverUrl: '/',
  },
  getConfig() {
    return config[config.active];
  }
};

export default config;
