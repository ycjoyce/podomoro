import Vue from 'vue';
import Vuex from 'vuex';
import {
  setStorage,
  deleteDataInStorage,
  updateStorage,
} from '@/assets/js/util';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modalData: null,
    todoTask: [],
    ringtoneAudio: [
			{
				id: 1,
				title: 'Brett Young',
				src: require('@/assets/ringtone/brett__young_.mp3'),
			},
			{
				id: 2,
				title: 'Got what I got',
				src: require('@/assets/ringtone/got_what_i_got.mp3'),
			},
			{
				id: 3,
				title: 'Suga boom boom',
				src: require('@/assets/ringtone/suga_boom_boom.mp3'),
			}
		],
    ringtoneIdSelected: {
      work: 1,
      break: 1,
    },
    curTask: {
      id: null,
      completedCircles: null,
      time: null,
      status: null,
    },
    editCurTask: null,
  },
  getters: {
    taskNotCompleted(state) {
      return state.todoTask.filter((task) => !task.completed);
    },
    taskCompleted(state) {
      return state.todoTask.filter((task) => task.completed);
    },
    curTaskData(state) {
      return state.todoTask.find((task) => task.id === state.curTask.id);
    },
  },
  mutations: {
    triggerModal(state, data) {
      state.modalData = data;
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
    setRingtone(state, { type, id }) {
      state.ringtoneIdSelected[type.toLowerCase()] = id;
    },
    setCurTask(state, { col, val }) {
      state.curTask[col] = val;
    },
    clearCurTask(state) {
      for (let col in state.curTask) {
        if (!Object.prototype.hasOwnProperty.call(state.curTask, col)) {
          continue;
        }
        state.curTask[col] = null;
      }
    },
    editCurTask(state, data) {
      state.editCurTask = data;
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
    setRingtone({ state, commit }, data) {
      commit('setRingtone', data);
      if (localStorage.getItem('ringtone')) {
        localStorage.removeItem('ringtone');
      }
      localStorage.setItem('ringtone', JSON.stringify(state.ringtoneIdSelected));
    },
    setCurTask({ commit }, data) {
      if (!data) {
        commit('clearCurTask');
        return;
      }
      if (!Array.isArray(data)) {
        commit('setCurTask', data);
        return;
      }
      for (let item of data) {
        commit('setCurTask', item);
      }
    },
    runTimer({ state, commit }) {
      let prevTime = state.curTask.time;
      if (prevTime < 1) {
        return;
      }
      commit('setCurTask', {
        col: 'time',
        val: prevTime - 1,
      });
    },
    setCurTaskCompletedCircles({ state, commit, dispatch }) {
      let todayDate = new Date().toLocaleDateString();
      let updatedTask = JSON.parse(JSON.stringify(state.todoTask.find((task) => task.id === state.curTask.id)));
      let dateIndex = updatedTask.progress.findIndex((data) => data.date === todayDate);

      if (dateIndex < 0) {
        updatedTask.progress.push({
          date: new Date().toLocaleDateString(),
          count: 1,
        });
      } else {
        updatedTask.progress[dateIndex].count += 1;
      }

      const newCirclesForCurTask = state.curTask.completedCircles + 1;

      commit('setCurTask', {
        col: 'completedCircles',
        val: newCirclesForCurTask,
      });

      dispatch('operateTodoTask', {
        type: 'update',
        data: {
          task: updatedTask,
          dataToUpdateStorage: [{
            targetId: updatedTask.id,
            column: 'progress',
            data: updatedTask.progress.find((item) => item.date === todayDate),
          }],
        },
      });
    },
  },
});
