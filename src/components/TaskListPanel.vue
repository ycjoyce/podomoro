<template>
	<div class="panel-outer-container">
		<h2 class="title-primary">
			TASK LIST
		</h2>
		<TagList
			:data="tagListData"
		/>
	</div>
</template>

<script>
import TagList from './TagList';

export default {
  components: {
    TagList,
  }, 
  computed: {
    tagListData() {
      return {
        type: 'todoList',
				tags: [
					{
						title: 'TO DO',
						list: this.todoList,
					},
					{
						title: 'DONE',
						list: this.doneList,
					}
				],
      };
    },
    todoList() {
      return this.$store.state.todoTask.filter((task) => (
        !task.completed && task.show
      ));
    },
    doneList() {
      return this.$store.state.todoTask.filter((task) => (
        task.completed && task.show
      ));
    },
  },
}
</script>