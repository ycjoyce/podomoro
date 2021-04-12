<template>
  <div>
    <ul class="tags-list">
			<li
				v-for="(tag, tagIndex) in data.tags"
				:key="tagIndex"
				@click="selectTag(tag.title)"
				class="tags-item"
				:class="{ active: tag.title === curTag }"
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
        v-else-if="data.type === 'ringtoneList'"
      />

      <p
				v-else
				class="tags-panel-empty"
			>
				You don't have any task now,
				<br>
				please add task first!
			</p>
    </div>
  </div>
</template>

<script>
import TodoTag from './TodoTag';
import RingtoneTag from './RingtoneTag';

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
      return function(title) {
        return this.data.tags.find((tag) => (
          tag.title === title
        ));
      }
    },
  },
}
</script>