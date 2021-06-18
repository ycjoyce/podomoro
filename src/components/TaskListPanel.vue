<template>
	<div class="panel-outer-container">
		<h2 class="title-primary">
			TASK LIST
		</h2>

		<TagList :data="tagListData">
			<template v-slot:default="slotProp">
				<TodoTag
					class="content-list todo"
					v-if="slotProp.content.list.length > 0"
					:data="slotProp.content"
				/>
			</template>
		</TagList>
	</div>
</template>

<script>
import TagList from '@/components/TagList';
import TodoTag from '@/components/TodoTag';

export default {
  components: {
		TagList,
		TodoTag,
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
