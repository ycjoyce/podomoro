<template>
  <div
    class="main-circle clock"
    :class="[
      'main-circle',
      'clock',
      { 'break': $store.state.curTask.status === 'break' },
    ]"
  >
    <div class="main-circle-rotate"></div>

    <div class="main-circle-time">
      <p
        v-if="hasMounted"
        class="main-circle-time-text"
      >
        {{timeToShow}}
      </p>
    </div>
  </div>
  <!-- <div
    class="main-circle clock"
    ref="main-circle"
    :class="{ break: $store.state.curState === 'break' }"
    :style="{
      backgroundColor: $store.state.themeColor.bgc,
      backgroundImage: `linear-gradient(to right, transparent 50%, ${$store.state.themeColor[$store.state.curState]} 0)`,
    }"
  >
    <div
      class="main-circle-rotate"
      :style="{
        border: `2px solid blue`,
        transform: `rotate(${$store.state.curDegree}deg)`,
        backgroundColor: $store.getters.coloredRotate,
      }"
    ></div>

    <div class="main-circle-time">
      <p class="main-circle-time-text">
        {{$store.state.curTime}}
      </p>
    </div>

    <audio
      :src="getRingtone"
      ref="main-clock-audio"
    ></audio>
  </div> -->
</template>

<script>
import mixin from '../mixin';

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
    };
  },
  computed: {
    originalTime() {
      return Math.round(this.task.tomatoes * this.perTomatoMin * 60);
    },
    timeToShow() {
      return this.formattedTime(this.$store.state.curTask.time);
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
  },
  mounted() {
    this.hasMounted = true;
  },
}
</script>
