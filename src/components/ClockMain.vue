<template>
  <div class="main-container-outer">
    <div class="main-container-inner">
			<div class="main-container-inner-box">
				<clock-title
					:task="taskToShow"
				/>

				<clock
					:task="taskToShow"
					:perTomatoMin="0.5"
				/>

				<clock-operate/>
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
	computed: {
		taskToShow() {
			return this.$store.getters.curTaskData || {};
		},
	},
	watch: {
		'$store.state.todoTask.length': function(val, oldVal) {
			if (!oldVal && val) {
				this.$store.dispatch('setCurTask', [
					{
						col: 'id',
						val: this.$store.state.todoTask[0].id,
					},
					{
						col: 'status',
						val: 'work',
					},
					{
						col: 'completedCircles',
						val: this.completedCircleAmt(this.taskToShow),
					},
				]);
			}
		},
	},
}
</script>