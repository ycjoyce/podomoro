<template>
	<div class="panel-outer-container">
		<h2 class="title-primary">
			RING TONE
		</h2>
		<TagList :data="tagListData"/>
	</div>
</template>

<script>
import TagList from '@/components/TagList';

export default {
  components: {
		TagList,
	},
  data() {
		return {
			tagListData: {
				type: 'ringtoneList',
				tags: [
					{
						title: 'WORK',
						list: this.$store.state.ringtoneAudio,
					},
					{
						title: 'BREAK',
						list: this.$store.state.ringtoneAudio,
					}
				],
			},
		};
	},
};
</script>
