const prefix = 'SYSTEM_',
  TOKEN = `${prefix}TOKEN`,
  IS_LOGIN = `${prefix}LOGIN`,
  MENUINFO = `${prefix}MENUINFO`,
  AUTHORITIES = `${prefix}AUTHORITIES`,
  USERINFO = `${prefix}USERINFO`,
  USERTYPE = `${prefix}USERTYPE`,
  CURRENTPAGE = `${prefix}CURRENTPAGE`;
const auth = {
  //设置是否登录
  setIsLogin: (isLogin = 0) => {
    localStorage.setItem(IS_LOGIN, isLogin);
  },
  //判断是否登录
  isLogin: () => {
    return !!localStorage.getItem(IS_LOGIN) && !!auth.getToken();
  },
  //设置token
  setToken: token => {
    localStorage.setItem(TOKEN, token);
  },
  //获取token
  getToken: () => {
    return localStorage.getItem(TOKEN);
  },
  //设置用户信息
  setUserInfo: userInfo => {
    if (typeof userInfo === 'object')
      userInfo = JSON.stringify(userInfo);
    localStorage.setItem(USERINFO, userInfo);
  },
  //获取用户信息
  getUserInfo: () => {
    return JSON.parse(localStorage.getItem(USERINFO)) || {};
  },
  //设置用户类型
  setUserType: userType => {
    localStorage.setItem(USERTYPE, userType);
  },
  //获取用户类型
  getUserType: () => {
    return localStorage.getItem(USERTYPE);
  },

  //设置登录用户角色权限
  setAuthorities: info => {
    if (typeof info === 'object')
      info = JSON.stringify(info);
    localStorage.setItem(AUTHORITIES, info);
  },
  //获取登录用户角色权限
  getAuthorities: () => {
    return JSON.parse(localStorage.getItem(AUTHORITIES));
  },

  //设置菜单信息
  setMenuInfo: info => {
    if (typeof info === 'object')
      info = JSON.stringify(info);
    localStorage.setItem(MENUINFO, info);
  },
  //获取菜单信息
  getMenuInfo: () => {
    return JSON.parse(localStorage.getItem(MENUINFO));
  },

  // 设置当前路由，对应home.vue菜单组件默认选中
  setCurrentPage: (path) => {
    localStorage.setItem(CURRENTPAGE, path);
  },
  // 获取当前路由，对应home.vue菜单组件默认选中
  getCurrentPage: () => {
    return localStorage.getItem(CURRENTPAGE) || ''
  },
  //删除token
  removeToken: () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(IS_LOGIN);
    localStorage.removeItem(USERINFO);
    localStorage.removeItem(USERTYPE);
    localStorage.removeItem(MENUINFO);
    localStorage.removeItem(AUTHORITIES);
  },

};

export default auth;
