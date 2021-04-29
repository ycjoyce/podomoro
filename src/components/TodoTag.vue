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
        :editPanelOpened="editPanelOpened"
        @toggleEditPanel="handleToggleEditPanel"
      />

      <EditPanel
        pos="tag-list"
        :tomatoAmount="10"
        :defaultValue="defaultValue(item)"
        @updateTaskTitle="setValue"
        @updateTomatoNums="setValue"
        v-if="data.title === 'TO DO'"
        v-show="editPanelOpened === `${data.title}-${itemIndex}`"
      >
        <template v-slot:buttons>
          <div class="content-panel-btn-area">
            <MyButton
              title="DELETE"
              type="secondary"
              :method="deleteTask.bind(null, item.id)"
              pos="tag-list"
            /> 
            <MyButton
              title="SAVE"
              type="primary"
              :method="checkInput.bind(null, item.id, itemIndex)"
              pos="tag-list"
            />
          </div>
        </template>
      </EditPanel>

      <div
        class="content-panel"
        v-else
        v-show="editPanelOpened === `${data.title}-${itemIndex}`"
      >
        <div class="content-panel-btn-area">
          <MyButton
            title="DELETE"
            type="secondary"
            :method="deleteTask.bind(null, item.id, itemIndex)"
            pos="tag-list"
          />
          <MyButton
            title="REDO"
            type="primary"
            :method="redoTask.bind(null, item.id, itemIndex)"
            pos="tag-list"
          />
        </div>
      </div>
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
      editPanelOpened: null,
    };
  },
  computed: {
    taskList() {
      return this.data.list;
    },
    taskTitle() {
      return this.taskList.map((item) => item.title);
    },
    tomatoNums() {
      return this.taskList.map((item) => item.tomatoes);
    },
    defaultValue() {
      return (task) => (
        {
          title: task.title,
          tomatoes: task.tomatoes,  
        }
      );
    },
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
    deleteTask(id) {
      this.$store.dispatch('operateTodoTask', {
        type: 'delete',
        data: id,
      }).then(() => {
        this.handleToggleEditPanel(this.editPanelOpened);
      });
    },
    checkInput(id, index) {
      const title = this.taskTitle[index];
      const tomatoes = this.tomatoNums[index];

      if (title && tomatoes) {
        this.updateTask(id, index);
        return;                   
      }

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
    },
    updateTask(id, index) {
      if (id === this.$store.state.curTask.id) {
        this.$store.commit('setCurTask', {
          col: 'completedCircles',
          val: 0,
        });
      }

      let updatedTask = JSON.parse(JSON.stringify(this.taskList[index]));
      updatedTask.title = this.taskTitle[index];
      updatedTask.tomatoes = this.tomatoNums[index];

      this.$store.dispatch('operateTodoTask', {
        type: 'update',
        data: {
          task: updatedTask,
          dataToUpdateStorage: [
            {
              targetId: id,
              column: 'title',
              data: this.taskTitle[index],
            },
            {
              targetId: id,
              column: 'tomatoes',
              data: this.tomatoNums[index],
            },
          ],
        },
      }).then(() => {
        this.handleToggleEditPanel(this.editPanelOpened);
      });
    },
    redoTask(id, index) {
      let updatedTask = JSON.parse(JSON.stringify(this.taskList[index]));
			updatedTask.completed = false;

      this.$store.dispatch('operateTodoTask', {
        type: 'update',
        data: {
          task: updatedTask,
          dataToUpdateStorage: [
            {
              targetId: id,
              column: 'completed',
              data: false,
            },
          ],
        },
      }).then(() => {
        this.handleToggleEditPanel(this.editPanelOpened);
      });
    },
  },
}
</script>