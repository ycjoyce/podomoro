import Vue from 'vue';
import Vuex from 'vuex';
import {
  setStorage,
  deleteDataInStorage,
  updateStorage,
} from './assets/js/util';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    panelShow: true,
    curPage: 'add',
    modalData: null,
    todoTask: [],
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
    addTodoTask(state,task) {
			state.todoTask.push(task);
		},
    deleteTodoTask(state, id) {
      let targetIndex = state.todoTask.findIndex((task) => (
				task.id === id
			));
			state.todoTask.splice(targetIndex, 1);
    },
    updateTodoTask(state, data) {
      const targetIndex = state.todoTask.findIndex((task) => task.id === data.id);
      state.todoTask.splice(targetIndex, 1, data);
    },
  },
  actions: {
    operateTodoTask({ commit }, { type, data }) {
      switch (type) {
        case 'add':
          commit('addTodoTask', data);
          setStorage('addTodoTask', data);
          break;
        case 'delete':
          commit('deleteTodoTask', data);
          deleteDataInStorage('addTodoTask', data);
          break;
        case 'update':
          commit('updateTodoTask', data.task);
          for (let item of data.dataToUpdateStorage) {
            updateStorage(item);
          }
          break;
        default:
          break;
      }
    },
  },
});