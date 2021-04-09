<template>
  <ul>
    <li
      v-for="(item, itemIndex) in taskList"
      :key="itemIndex"
      class="content-item"
    >
      <TodoTagPanelTitle
        :type="data.title"
        :data="item"
        :index="itemIndex"
        @toggleEditPanel="handleToggleEditPanel"
        :editPanelOpened="editPanelOpened"
      />
      <EditPanel
        pos="tag-list"
        :tomatoAmount="10"
        @updateTaskTitle="setValue"
        @updateTomatoNums="setValue"
        v-show="editPanelOpened === `${data.title}-${itemIndex}`"
      >
        <template v-slot:buttons>
          <div class="content-panel-btn-area">
            <MyButton
              title="DELETE"
              type="secondary"
              :method="deleteTask.bind(null, item.id, itemIndex)"
              pos="tag-list"
            /> 
            <MyButton
              title="SAVE"
              type="primary"
              :method="saveTaskEdit.bind(null, item.id, itemIndex)"
              pos="tag-list"
              v-if="data.title === 'TO DO'"
            /><!--
            <MyButton
              title="REDO"
              type="primary"
              class="pos-tag-list"
              :method="toRedo.bind(null, item)"
              v-if="getTagData(nowTag).title === 'DONE'"
            /> -->
          </div>
        </template>
      </EditPanel>
    </li>
  </ul>
</template>

<script>
import MyButton from './MyButton';
import TodoTagPanelTitle from './TodoTagPanelTitle';
import EditPanel from './EditPanel';

export default {
  components: {
    MyButton,
    TodoTagPanelTitle,
    EditPanel,
  }, 
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      taskList: this.data.list,
      editPanelOpened: null,
      taskTitle: Array.from({ length: this.data.list.length }, () => ''),
      tomatoNums: Array.from({ length: this.data.list.length }, () => 0),
    };
  },
  computed: {
    openedPanelIndex() {
      return !this.editPanelOpened ? null : this.editPanelOpened.slice().split('-').pop();
    },
  },
  methods: {
    setValue({ col, val }) {
      if (!this.openedPanelIndex) return;
      this[col].splice(this.openedPanelIndex, 1, val);
    },
    handleToggleEditPanel(index) {
      this.editPanelOpened = this.editPanelOpened !== index ? index : null;
    },
    deleteTask(taskId, index) {
      this.$store.dispatch('operateTodoTask', {
        type: 'delete',
        data: taskId,
      });
      this.taskList.splice(index, 1);
    },
    saveTaskEdit() {
      this.checkInput();
    },
    checkInput() {
      if (!this.openedPanelIndex) return;
      const title = this.taskTitle[this.openedPanelIndex];
      const tomatoes = this.tomatoNums[this.openedPanelIndex];
      if (!title || !tomatoes) {
        const content = !title ?
                        !tomatoes ?
                        'Please enter the task title and estimate the amount of tomatoes!' :
                        'Please enter the task title!' :
                        'Please estimate the amount of tomatoes!';
        this.$store.commit('triggerModal',{ 
          title: 'Error',
          content,
          button: [
            {
              title: 'OK',
              type: 'primary',
              method: () => {
                this.$store.commit('triggerModal', null);
              },
            }
          ],
        });
        return;                   
      }
      this.updateTask();
    },
    updateTask() {
      const targetId = this.data.list[this.openedPanelIndex].id;
      this.$store.dispatch('operateTodoTask', {
        type: 'update',
        data: {
          task: this.data,
          dataToUpdateStorage: [
            {
              storage: 'addTodoTask',
              targetId,
              column: 'title',
              data: this.taskTitle[this.openedPanelIndex],
            },
            {
              storage: 'addTodoTask',
              targetId,
              column: 'tomatoes',
              data: this.tomatoNums[this.openedPanelIndex],
            },
          ],
        },
      });
    },
  },
}
</script>