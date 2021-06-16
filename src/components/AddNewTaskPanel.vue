<template>
  <div class="panel-outer-container">
    <h2 class="title-primary">
      ADD NEW TASK
    </h2>

    <EditPanel
      pos="add-new-task"
      :tomatoAmount="10"
      :clear="whetherClearPanel"
      @updateTaskTitle="setValue"
      @updateTomatoNums="setValue"
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
import EditPanel from '@/components/EditPanel';
import MyButton from '@/components/MyButton';

export default {
  components: {
    EditPanel,
    MyButton,
  },
  data() {
    return {
      taskTitle: '',
      tomatoNums: 0,
      whetherClearPanel: false,
    };
  },
  methods: {
    setValue({ col, val }) {
      this[col] = val;
    },
    checkInputData() {
      if (!this.taskTitle) {
        this.triggerErrorModal('Please enter the task title!');
        return;
      }

      if (this.tomatoNums < 1) {
        this.triggerErrorModal('Please estimate the amount of tomatoes!');
        return;
      }

      this.addTask();
    },
    triggerErrorModal(msg) {
      this.$store.commit('triggerModal', {
        title: 'Error',
        content: msg,
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
    addTask() {
      const data = {
        id: Date.now(),
        title: this.taskTitle,
        tomatoes: this.tomatoNums,
        completed: false,
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
};
</script>
