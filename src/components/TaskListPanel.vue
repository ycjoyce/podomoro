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
import TagList from '@/components/TagList';

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
						list: this.$store.getters.taskNotCompleted,
					},
					{
						title: 'DONE',
						list: this.$store.getters.taskCompleted,
					}
				],
      };
    },
  },
};
</script>
