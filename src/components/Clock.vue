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
  },
  data() {
    return {
      hasMounted: false,
    };
  },
  computed: {
    originalTime() {
      return this.task.tomatoes * this.perTomatoMin * 60;
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
  watch: {
    hasMounted(val, oldVal) {
      if (!oldVal && val) {
        this.$store.commit('setCurTask', {
          col: 'time',
          val: this.originalTime,
        });
      }
    },
  },
  mounted() {
    this.hasMounted = true;
  },
}
</script>
