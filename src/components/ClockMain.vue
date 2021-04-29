<template>
  <div class="main-container-outer">
    <div class="main-container-inner">
			<div class="main-container-inner-box">
				<clock-title
					:task="taskToShow"
				/>

				<clock
					:task="taskToShow"
					:perTomatoMin="perTomatoMin"
					:reset="whetherResetClock"
					@completeTask="handleComplete"
				/>

				<clock-operate
					@resetClock="setClockStatus"
					@completeTask="handleComplete"
					:operate="operateBtns"
				/>

				<audio
					v-if="hasMounted"
					:src="ringtoneSrc"
					ref="main-clock-audio"
				></audio>
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
			hasMounted: false,
			whetherResetClock: false,
			perTomatoMin: 0.1,
			operateBtns: null,
		};
	},
	computed: {
		taskToShow() {
			return this.$store.getters.curTaskData || {};
		},
		ringtoneSrc() {
      const status = this.$store.state.curTask.status;
      const ringtoneId = this.$store.state.ringtoneIdSelected[status];
      return this.$store.state.ringtoneAudio.find((ringtone) => ringtone.id === ringtoneId).src;
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
		handleComplete(directly) {
			if (directly) {
				this.completeTask();
				return;
			}

			const audio = this.$refs['main-clock-audio'];
			audio.play();

			switch (this.$store.state.curTask.status) {
				case 'work':
					this.openTaskCompleteModal(audio);
					break;
				case 'break':
					this.openBreakCompleteModal(audio);
					break;
				default:
					break;
			}
		},
		openTaskCompleteModal(audio) {
			this.$store.commit('triggerModal', {
				title: 'Task Done',
				content: 'You have done the task!',
				button: [
					{
						title: 'Take a break',
						type: 'primary',
						method: () => {
							this.closeModalAndRingtone(audio);
							this.takeABreak();
						},
					},
					{
						title: 'Keep going',
						type: 'secondary',
						method: () => {
							this.closeModalAndRingtone(audio);
							this.completeTask();
						},
					}
				],
			});
		},
		openBreakCompleteModal(audio) {
			this.$store.commit('triggerModal', {
				title: 'Breaktime is over',
				content: 'Would you like to start the next task?',
				button: [
					{
						title: 'Start',
						type: 'primary',
						method: () => {
							this.closeModalAndRingtone(audio);
							this.completeTask();
						},
					},
				],
			});
		},
		closeModalAndRingtone(audio) {
			audio.pause();
			audio.currentTime = 0;
			this.$store.commit('triggerModal', null);
		},
		takeABreak() {
			this.$store.commit('setCurTask', {
				col: 'status',
				val: 'break',
			});
			this.whetherResetClock = this.perTomatoMin * 60;
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
					val: 0,
				},
			]);
		},
	},
	watch: {
		'$store.getters.taskNotCompleted.length': function() {
			this.setCurTask();
		},
	},
	mounted() {
		this.hasMounted = true;
		this.setCurTask();
	},
}
</script>