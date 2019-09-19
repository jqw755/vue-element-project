
const actions = {
  // 动态设置html的favicon
  setFavicon({commit}, href) {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    // link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = href;
    document.getElementsByTagName('head')[0].appendChild(link);
  },
  setTitle: ({commit}, t) => {
    commit('SETTITLE', t);
  },


};
export default actions;
