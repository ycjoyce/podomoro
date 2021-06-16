<template>
  <div :class="{'content-panel': pos === 'tag-list'}">
    <TextInput
      title="TASK TITLE"
      :modelValue.sync="taskTitle"
      :pos="pos"
    />

    <TomatoesToSelect
      :amount="tomatoAmount"
      :tomatoSelected.sync="tomatoNums"
    />

    <slot name="buttons"></slot>
  </div>
</template>

<script>
import TextInput from '@/components/TextInput';
import TomatoesToSelect from '@/components/TomatoesToSelect';

export default {
  components: {
    TextInput,
    TomatoesToSelect,
  },
  props: {
    pos: String,
    defaultValue: Object,
    clear: Boolean,
    tomatoAmount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      taskTitle: '',
      tomatoNums: 0,
    };
  },
  watch: {
    taskTitle(title) {
      this.$emit('updateTaskTitle', {
        col: 'taskTitle',
        val: title,
      });
    },
    tomatoNums(num) {
      this.$emit('updateTomatoNums', {
        col: 'tomatoNums',
        val: num,
      });
    },
    clear(val) {
      if (val) {
        this.taskTitle = '';
        this.tomatoNums = 0;
      }
    },
    'defaultValue.title': function(val) {
      this.taskTitle = val;
    },
    'defaultValue.tomatoes': function(val) {
      this.tomatoNums = val;
    },
  },
  created() {
    if (this.defaultValue) {
      this.taskTitle = this.defaultValue.title;
      this.tomatoNums = this.defaultValue.tomatoes;
    }
  },
};
</script>
