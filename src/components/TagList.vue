<template>
  <div>
    <ul class="tags-list">
			<li
				v-for="tag in data.tags"
				:key="tag.title"
        :class="[
          'tags-item',
          { active: tag.title === curTag }
        ]"
				@click="selectTag(tag.title)"
			>
				{{tag.title}}
			</li>
		</ul>

    <div class="tags-panel">
      <TodoTag
        class="content-list todo"
        v-if="data.type === 'todoList' && getTagData(curTag).list.length > 0"
        :data="getTagData(curTag)"
      />

      <RingtoneTag
        class="content-list ringtone"
        v-else-if="data.type === 'ringtoneList' && getTagData(curTag).list.length > 0"
        :data="getTagData(curTag)"
      />

      <p
				v-else
				class="tags-panel-empty"
			>
				You don't have any {{itemName}} now,
				<br>
				please add {{itemName}} first!
			</p>
    </div>
  </div>
</template>

<script>
import TodoTag from '@/components/TodoTag';
import RingtoneTag from '@/components/RingtoneTag';

export default {
  components: {
    TodoTag,
    RingtoneTag,
  }, 
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      curTag: this.data.tags[0].title,
    };
  },
  methods: {
    selectTag(title) {
      this.curTag = title;
    },
  },
  computed: {
    getTagData() {
      return (title) => (
        this.data.tags.find((tag) => (
          tag.title === title
        ))
      );
    },
    itemName() {
      if (this.data.type === 'todoList') {
        return 'task';
      }
      if (this.data.type === 'ringtoneList') {
        return 'ringtone';
      }
      return 'item';
    },
  },
};
</script>
