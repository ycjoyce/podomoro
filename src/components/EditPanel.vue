<template>
  <div>
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
// import MyButton from './MyButton';
import TextInput from './TextInput';
import TomatoesToSelect from './TomatoesToSelect';

export default {
  components: {
    // MyButton,
    TextInput,
    TomatoesToSelect,
  },
  props: {
    pos: {
      type: String,
      required: false,
    },
    // buttons: {
    //   type: Array,
    //   required: false,
    // },
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
  },
}
</script>