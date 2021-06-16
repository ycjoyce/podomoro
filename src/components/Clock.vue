<template>
  <div
    :class="[
      'main-circle',
      'clock',
      { 'break': $store.state.curTask.status === 'break' },
    ]"
    :style="{
      backgroundColor: clockColor['bgc'],
      backgroundImage: circleRightColor,
    }"
  >
    <div
      class="main-circle-rotate"
      :style="{
        transform: `rotate(${rotateDeg}deg)`,
        backgroundColor: rotateColor,
      }"
    ></div>

    <div class="main-circle-time">
      <p
        v-if="hasMounted"
        class="main-circle-time-text"
      >
        {{timeToShow}}
      </p>
    </div>
  </div>
</template>

<script>
import mixin from '@/mixin';

export default {
  mixins: [mixin],
  props: {
    task: {
      type: Object,
      required: true,
    },
    perTomatoMin: {
      type: Number,
      required: true,
    },
    reset: {
      type: [Boolean, Number],
      required: true,
    },
  },
  data() {
    return {
      hasMounted: false,
      clockColor: {
        bgc: '#ACACAC',
        work: '#EA5548',
        break: '#B5E254',
      },
      secondHalf: false,
    };
  },
  computed: {
    originalTime() {
      if (this.$store.state.curTask.status === 'work') {
        return Math.round(this.task.tomatoes * this.perTomatoMin * 60);
      }
      return Math.round(this.perTomatoMin * 60);
    },
    timeToShow() {
      return this.formattedTime(this.$store.state.curTask.time);
    },
    calDeg() {
      const perSecDeg = 360 / this.originalTime;
      return (this.originalTime - this.$store.state.curTask.time) * perSecDeg;
    },
    rotateDeg() {
      if (this.calDeg <= 180) {
        return this.calDeg;
      }
      return this.calDeg - 180;
    },
    circleRightColor() {
      return `linear-gradient(
        to right,
        transparent 50%,
        ${this.clockColor[this.$store.state.curTask.status]} 0)
      `;
    },
    rotateColor() {
      if (this.secondHalf) {
        return this.clockColor[this.$store.state.curTask.status];
      }
      return this.clockColor['bgc'];
    },
  },
  methods: {
    setCurTaskToOriginalTime() {
      this.$store.commit('setCurTask', {
        col: 'time',
        val: this.originalTime,
      });
    },
  },
  watch: {
    hasMounted(val, oldVal) {
      if (!oldVal && val) {
        this.setCurTaskToOriginalTime();
      }
    },
    reset(val) {
      if (!val) {
        return;
      }
      if (val === true) {
        this.setCurTaskToOriginalTime();
        return;
      }
      this.$store.commit('setCurTask', {
        col: 'time',
        val,
      });
    },
    originalTime(val, oldVal) {
      if(oldVal && val) {
        this.$store.commit('setCurTask', {
          col: 'time',
          val,
        });
      }
    },
    'task.id': function(val, oldVal) {
      if (oldVal && val) {
        this.setCurTaskToOriginalTime();
      }
    },
    '$store.state.curTask.time': function(val) {
      const unit = this.perTomatoMin * 60;

      if (this.$store.state.curTask.status === 'break') {
        return;
      }
      if (val % unit === 0 && val !== this.originalTime) {
        this.$store.dispatch('setCurTaskCompletedCircles');
      }
    },
    calDeg(val) {
      this.secondHalf = !(val <= 180);
    },
  },
  mounted() {
    this.hasMounted = true;
  },
};
</script>
