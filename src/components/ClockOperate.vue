<template>
  <div class="main-circle-operate">
    <div
      :class="[
        'btn-group',
        { 'break': $store.state.curTask.status === 'break' }
      ]"
    >
      <button
        v-for="btn in operateBtns"
        :key="btn"
        :class="[
          'btn',
          `btn-${btn}`,
          { selected: btnSelected === btn }
        ]"
        :ref="`btn-${btn}`"
        @click="handleOperate(btn)"
      ></button>
    </div>

    <p
      class="main-circle-complete"
      @click="completeTask(true)"
    >
      <img
        class="main-circle-complete-img"
        :src="require('@/assets/img/complete_colored.svg')"
      >
      TASK COMPLETE
    </p>
  </div>
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
    handleOperate(type) {
      if (type === this.btnSelected) {
        window.event.preventDefault();
        return;
      }

      if (window.event) {
        this.btnSelected = type;
      }

      if (!['play', 'pause', 'reset'].includes(type)) {
        return;
      }

      this[type]();
    },
    play() {
      this.$emit('resetClock', false);
      
      this.$store.dispatch('runTimer');
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
      this.btnSelected = null;
      this.$store.commit('setCurTask', {
        col: 'completedCircles',
        val: 0,
      });
    },
    completeTask(directly) {
      this.pause();
      this.$emit('completeTask', directly);
      this.btnSelected = null;
    },
  },
  watch: {
    '$store.state.curTask.time': function(val) {
      if (val < 1) {
        this.completeTask();
      }
    },
  },
};
</script>
