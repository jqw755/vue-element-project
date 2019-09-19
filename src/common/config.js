const config = {
  active: 'dev',
  dev: {
    baseUrl: '',
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
