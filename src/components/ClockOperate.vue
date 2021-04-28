<template>
  <div class="main-circle-operate">
    <div class="btn-group">
      <button
        v-for="(btn, btnIndex) in operateBtns"
        :key="`btn-${btnIndex}`"
        :class="[
          'btn',
          `btn-${btn}`,
          { selected: btnSelected === btn }
        ]"
        :ref="`btn-${btn}`"
        @click="handleOperate($event, btn)"
      ></button>
    </div>

    <p
      class="main-circle-complete"
      @click="completeTask"
    >
      <img
        class="main-circle-complete-img"
        :src="require('@/assets/img/complete_colored.svg')"
      >
      TASK COMPLETE
    </p>
  </div>
  <!-- <div class="main-circle-operate">
    <div class="btn-group">
      <button
        class="btn btn-play"
        :class="{
          break: $store.state.curState === 'break',
          selected: curOperate === 'play',
        }"
        ref="play-btn"
        @click="play"
      ></button>

      <button
        class="btn btn-pause"
        :class="{
          break: $store.state.curState === 'break',
          selected: curOperate === 'pause',
        }"
        ref="pause-btn"
        @click="pause"
      ></button>

      <button
        class="btn btn-reset"
        :class="{
          break: $store.state.curState === 'break',
          selected: curOperate === 'reset',
        }"
        ref="reset-btn"
        @click="reset"
      ></button>
    </div>

    <p
      class="main-circle-complete"
      @click="complete"
    >
      <img
        class="main-circle-complete-img"
        :src="$store.state.images.complete"
      >
      TASK COMPLETE
    </p>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      operateBtns: [
        'play', 'pause', 'reset'
      ],
      timer: null,
      btnSelected: null,
    };
  },
  methods: {
    handleOperate(e, type) {
      if (type === this.btnSelected) {
        e.preventDefault();
        return;
      }

      this.btnSelected = type;

      switch (type) {
        case 'play':
          this.play();
          break;
        case 'pause':
          this.pause();
          break;
        case 'reset':
          this.reset();
          break;
        default:
          break;
      }
    },
    play() {
      this.$emit('resetClock', false);
      this.timer = setInterval(() => {
        this.$store.dispatch('runTimer');
      }, 1000);
    },
    pause() {
      clearInterval(this.timer);
    },
    reset() {
      this.pause();
      this.$emit('resetClock', true);
    },
    completeTask() {
      this.pause();
      this.$emit('completeTask');
    },
  },
  watch: {
    '$store.state.curTask.time': function(val) {
      if (val < 1) {
        this.pause();
      }
    },
  },
}
</script>
