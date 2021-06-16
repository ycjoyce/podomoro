<template>
	<div class="aside-panel">
    <transition name="fade" mode="out-in">
      <component :is="curPanel"
      ></component>
    </transition>
	</div>
</template>

<script>
import AddNewTaskPanel from '@/components/AddNewTaskPanel';
import TaskListPanel from '@/components/TaskListPanel';
import AnalyticPanel from '@/components/AnalyticPanel';
import RingtonePanel from '@/components/RingtonePanel';

export default {
  props: {
    curPage: String,
  },
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
      return panelMap[this.curPage];
    },
  },
};
</script>
