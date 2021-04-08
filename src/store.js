import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    panelShow: true,
    curPage: 'add',
    modalData: null,
  },
  mutations: {
    switchPage(state, page) {
      state.curPage = page;
    },
    triggerModal(state, data) {
      state.modalData = data;
    },
    togglePanel(state, type) {
      state.panelShow = !(type === 'to-close');
    },
  },
});