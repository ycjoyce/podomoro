import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    panelShow: true,
    curPage: 'add',
  },
  mutations: {
    switchPage(state, page) {
      state.curPage = page;
    },
  },
});