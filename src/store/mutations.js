
const mutations = {
  SETFAVICON: (state, href) => {
    state.favicon = href;
  },
  SETTITLE: (state, t) => {
    state.title = t;
    document.title = state.title;
  },

};

export default mutations;
