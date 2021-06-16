<template>
  <aside class="aside-area">
		<ButtonBar
			:cur-page="curPage"
			:panel-show="panelShow"
			@switchPage="switchPage"
			@togglePanel="togglePanel"
		/>

		<transition name="aside-panel">
			<Panel
				v-show="panelShow"
				:cur-page="curPage"
			/>
		</transition>
  </aside>
</template>

<script>
import ButtonBar from '@/components/ButtonBar';
import Panel from '@/components/Panel';

export default {
	components: {
		ButtonBar,
		Panel,
	},
	data() {
		return {
			curPage: 'add',
			panelShow: true,
		};
	},
	methods: {
		switchPage(page) {
			this.curPage = page;
		},
		togglePanel(type) {
			this.panelShow = type;
		},
	},
};
</script>
