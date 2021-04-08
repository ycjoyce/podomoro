<template>
	<div
		class="aside-panel"
		v-show="$store.state.panelShow"
	>
		<component :is="curPanel"></component>
	</div>
</template>

<script>
import AddNewTaskPanel from './AddNewTaskPanel';
import TaskListPanel from './TaskListPanel';
import AnalyticPanel from './AnalyticPanel';
import RingtonePanel from './RingtonePanel';

export default {
  components:{
		AddNewTaskPanel,
		TaskListPanel,
		AnalyticPanel,
		RingtonePanel,
	},
  computed: {
    curPanel() {
      const panelMap = {
        add: 'AddNewTaskPanel',
        list: 'TaskListPanel',
        analysis: 'AnalyticPanel',
        ringtone: 'RingtonePanel',
      };
      return panelMap[this.$store.state.curPage];
    },
  },
}
</script>
