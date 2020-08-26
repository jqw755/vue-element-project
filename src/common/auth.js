const prefix = 'EMSP_',
  TOKEN = `${prefix}TOKEN`,
  IS_LOGIN = `${prefix}LOGIN`,
  LANG = `${prefix}LANG`,
  COMPANYINFO = `${prefix}COMPANYINFO`,
  MENUINFO = `${prefix}MENUINFO`,
  ACCESSROUTE = `${prefix}ACCESSROUTE`,
  MENUTEMP = `${prefix}MENUTEMP`,
  AUTHORITIES = `${prefix}AUTHORITIES`,
  USERINFO = `${prefix}USERINFO`,
  USERTYPE = `${prefix}USERTYPE`,
  CURRENTPAGE = `${prefix}CURRENTPAGE`,
  BREADCRUMB = `${prefix}BREADCRUMB`,
  SIGN = `${prefix}SIGN`;
const auth = {

  //设置语言
  setLang: (lang = 'cn') => {
    localStorage.setItem(LANG, lang);
  },
  //设置语言
  getLang: () => {
    return localStorage.getItem(LANG) || 'cn';
  },

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

  // 设置面包屑导航
  setBreadcrumb(route){
    // 从面包屑跳转子页面的父级页面时，其父级页面可能是带有参数的，所以这里对meta中的parent字段进行再封装后传递
    const {to, from} = route;
    let meta = to.meta, result = [];

    if (meta.parents) {
      result = meta.parents.map((item,index, arr)=>{
        //  && index === arr.length-1
        if(item.isParams){
          item.href = from.path;
        }
        return item;
      });
    }

    result.push({name: meta.title, href: to.path});

    localStorage.setItem(BREADCRUMB, JSON.stringify(result));
  },
  // 获取面包屑导航
  getBreadcrumb(){
    return JSON.parse(localStorage.getItem(BREADCRUMB)) || [];
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
    // return (typeof userInfo) === 'object' ? JSON.parse(auth.getUserInfo()) : {username: userInfo};
  },

  //设置用户类型
  setUserType: userType => {
    localStorage.setItem(USERTYPE, userType);
  },
  //获取用户类型
  getUserType: () => {
    return localStorage.getItem(USERTYPE);
  },

  //设置公司信息
  setCompanyInfo: info => {
    if (typeof info === 'object')
      info = JSON.stringify(info);
    localStorage.setItem(COMPANYINFO, info);
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

  //设置可访问路由
  setAccessRoute: info => {
    if (typeof info === 'object')
      info = JSON.stringify(info);
    localStorage.setItem(ACCESSROUTE, info);
  },
  //获取可访问路由
  getAccessRoute: () => {
    return JSON.parse(localStorage.getItem(ACCESSROUTE));
  },

  //获取公司信息
  getCompanyInfo: () => {
    return JSON.parse(localStorage.getItem(COMPANYINFO)) || {};
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

  //设置菜单缓存信息
  setMenuTemp: info => {
    if (typeof info === 'object')
      info = JSON.stringify(info);
    localStorage.setItem(MENUTEMP, info);
  },
  //获取菜单缓存，路由进入前逐个对比判断，是否有权限进入
  getMenuTemp: () => {
    return JSON.parse(localStorage.getItem(MENUTEMP));
  },

  // 设置当前路由，对应home.vue菜单组件默认选中
  setCurrentPage: (path) => {
    localStorage.setItem(CURRENTPAGE, path);
  },
  // 获取当前路由，对应home.vue菜单组件默认选中
  getCurrentPage: () => {
    return localStorage.getItem(CURRENTPAGE) || ''
  },

  // 20191128 存储解密sign
  setDecryptSign(s){
    localStorage.setItem(SIGN, s);
  },
  getDecryptSign(){
    // 获取解密sign
    return localStorage.getItem(SIGN) || ''
  },

  //删除token
  removeToken: () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(IS_LOGIN);
    localStorage.removeItem(USERINFO);
    localStorage.removeItem(USERTYPE);
    localStorage.removeItem(COMPANYINFO);
    localStorage.removeItem(MENUINFO);
    localStorage.removeItem(AUTHORITIES);
    localStorage.removeItem(MENUTEMP);
    localStorage.removeItem(LANG);
    localStorage.removeItem(BREADCRUMB);
    localStorage.removeItem(SIGN);
  }

};

export default auth;
