<template>
  <div class="panel-outer-container">
    <h2 class="title-primary">
      ADD NEW TASK
    </h2>

    <EditPanel
      pos="add-new-task"
      :tomatoAmount="10"
      @updateTaskTitle="setValue"
      @updateTomatoNums="setValue"
      :clear="whetherClearPanel"
    >
      <template v-slot:buttons>
        <MyButton
          title="ADD TASK"
          type="primary"
          :method="checkInputData"
          pos="add-new-task"
        />
      </template>
    </EditPanel>
  </div>
</template>

<script>
import EditPanel from './EditPanel';
import MyButton from './MyButton';

export default {
  components: {
    EditPanel,
    MyButton,
  },
  data() {
    return {
      taskTitle: '',
      tomatoNums: 0,
      editPanelButtons: [
        {
          title: 'ADD TASK',
          type: 'primary',
          method: this.checkInputData,
        }
      ],
      whetherClearPanel: false,
    };
  },
  methods: {
    setValue({col, val}) {
      this[col] = val;
    },
    checkInputData() {
      if (!this.taskTitle) {
        this.$store.commit('triggerModal', {
          title: 'Error',
          content: 'Please enter the task title!',
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

      if (this.tomatoNums < 1) {
        this.$store.commit('triggerModal', {
          title: 'Error',
          content: 'Please estimate the amount of tomatoes!',
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

      this.addTask();
    },
    addTask() {
      const data = {
        id: Date.now(),
        title: this.taskTitle,
        tomatoes: this.tomatoNums,
        completed: false,
        show: true,
        progress: [],
      };

      this.$store.dispatch('operateTodoTask', {
        type: 'add',
        data,
      });

      this.finishAddingTask();
    },
    finishAddingTask() {
      this.whetherClearPanel = true;

      this.$store.commit('triggerModal', {
        title: 'Success',
        content: 'Added a new task succesfully!'
      });

      setTimeout(() => {
        this.$store.commit('triggerModal', null);
        this.whetherClearPanel = false;
      },1000);
    },
  },
}
</script>