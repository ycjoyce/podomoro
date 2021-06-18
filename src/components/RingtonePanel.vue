<template>
	<div class="panel-outer-container">
		<h2 class="title-primary">
			RING TONE
		</h2>
		
		<TagList :data="tagListData">
			<template v-slot:default="slotProp">
				<RingtoneTag
					class="content-list ringtone"
					v-if="slotProp.content.list.length > 0"
					:data="slotProp.content"
				/>
			</template>
		</TagList>
	</div>
</template>

<script>
import TagList from '@/components/TagList';
import RingtoneTag from '@/components/RingtoneTag';

export default {
  components: {
		TagList,
		RingtoneTag,
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
