<template>
  <div class="main-container-outer">
    <div class="main-container-inner">
			<div class="main-container-inner-box">
				<clock-title
					:task="taskToShow"
				/>

				<clock
					:task="taskToShow"
					:perTomatoMin="0.1"
					:reset="whetherResetClock"
					@completeTask="completeTask"
				/>

				<clock-operate
					@resetClock="setClockStatus"
					@completeTask="completeTask"
				/>
			</div>
		</div>
      
		<p class="product-name">
			PODOMORO
		</p>
  </div>
</template>

<script>
import ClockTitle from './ClockTitle';
import Clock from './Clock';
import ClockOperate from './ClockOperate';
import mixin from '../mixin';

export default {
	mixins: [mixin],
  components: {
		ClockTitle,
		Clock,
		ClockOperate,
	},
	data() {
		return {
			whetherResetClock: false,
		};
	},
	computed: {
		taskToShow() {
			return this.$store.getters.curTaskData || {};
		},
	},
	methods: {
		setClockStatus(val) {
			this.whetherResetClock = val;
		},
		completeTask() {
			if (Object.keys(this.taskToShow).length < 1) {
				return;
			}

			let updatedTask = JSON.parse(JSON.stringify(this.taskToShow));
			updatedTask.completed = true;
			const targetId = updatedTask.id;

			this.$store.dispatch('operateTodoTask', {
        type: 'update',
        data: {
          task: updatedTask,
          dataToUpdateStorage: [
            {
              targetId,
              column: 'completed',
              data: true,
            },
          ],
        },
      });
		},
		setCurTask() {
			if (this.$store.getters.taskNotCompleted.length < 1) {
				this.$store.commit('clearCurTask');
				return;
			}

			const curTask = this.$store.getters.taskNotCompleted[0];

			this.$store.dispatch('setCurTask', [
				{
					col: 'id',
					val: curTask.id,
				},
				{
					col: 'status',
					val: 'work',
				},
				{
					col: 'completedCircles',
					val: this.completedCircleAmt(curTask),
				},
			]);
		},
	},
	mounted() {
		this.setCurTask();
	},
	watch: {
		'$store.getters.taskNotCompleted.length': function() {
			this.setCurTask();
		},
	},
}
</script>