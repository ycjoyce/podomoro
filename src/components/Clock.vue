<template>
  <div
    class="main-circle clock"
  >
    <div class="main-circle-rotate"></div>

    <div class="main-circle-time">
      <p class="main-circle-time-text">
        {{timeToShow}}
      </p>
    </div>

    <audio
      v-if="hasMounted"
      :src="ringtoneSrc"
      ref="main-clock-audio"
    ></audio>
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
      type: Boolean,
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
    ringtoneSrc() {
      const status = this.$store.state.curTask.status;
      const ringtoneId = this.$store.state.ringtoneIdSelected[status];
      return this.$store.state.ringtoneAudio.find((ringtone) => ringtone.id === ringtoneId).src;
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
      if (val) {
        this.setCurTaskToOriginalTime();
      }
    },
    originalTime(val, oldVal) {
      if(oldVal && val) {
        this.$store.commit('setCurTask', {
          col: 'time',
          val,
        });
      }
    },
    '$store.state.curTask.time': function(val, oldVal) {
      const unit = this.perTomatoMin * 60;
      
      if (val % unit === 0 && oldVal) {
        this.$store.dispatch('setCurTaskCompletedCircles', {
          task: this.task,
        });
      }

      if (val < 1) {
        this.$emit('completeTask');
      }
    },
  },
  mounted() {
    this.hasMounted = true;
  },
}
</script>
