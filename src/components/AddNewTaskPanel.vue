<template>
  <div class="panel-outer-container">
    <h2 class="title-primary">
      ADD NEW TASK
    </h2>

    <TextInput
      title="TASK TITLE"
      :modelValue.sync="taskTitle"
      pos="add-new-task"
    />

    <div id="estimated-tomato">
      <h3 class="title-secondary">
        ESTIMATED TOMATO
      </h3>
      
      <TomatoesToSelect
        :amount="10"
        :tomatoSelected.sync="tomatoNums"
      />
    </div>

    <MyButton
      title="ADD TASK"
      type="primary"
      :method="checkInputData"
      pos="add-new-task"
    />
  </div>
</template>

<script>
import MyButton from './MyButton';
import TextInput from './TextInput';
import TomatoesToSelect from './TomatoesToSelect';

import { setStorage } from '../assets/js/util';

export default {
  components: {
    MyButton,
    TextInput,
    TomatoesToSelect,
  },
  data() {
    return {
      taskTitle: '',
      tomatoNums: 0,
    };
  },
  methods: {
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

      this.$store.commit('addTodoTask', data);
      setStorage('addTodoTask', data);

      this.finishAddingTask();
    },
    finishAddingTask() {
      this.tomatoNums = 0;
      this.taskTitle = '';

      this.$store.commit('triggerModal', {
        title: 'Success',
        content: 'Added a new task succesfully!'
      });

      setTimeout(() => {
        this.$store.commit('triggerModal', null);
      },1000);
    },
  },
}
</script>