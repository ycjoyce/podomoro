<template>
  <div
    id="app"
    :style="{ height: windowHeight + 'px' }"
  >
    <Modal
      :data="$store.state.modalData"
      v-if="$store.state.modalData"
    />

    <MainArea/>

    <AsideArea/>
  </div>
</template>

<script>
import Modal from '@/components/Modal';
import MainArea from '@/components/MainArea';
import AsideArea from '@/components/AsideArea';

export default {
  components: {
    Modal,
    MainArea,
    AsideArea,
  },
  data() {
    return {
      windowHeight: null,
    };
  },
  methods: {
    getWindowHeight() {
      this.windowHeight = document.documentElement.clientHeight;
    },
    initExistedTasks() {
      if (!localStorage.getItem('addTodoTask')) {
        return;
      }
      JSON.parse(localStorage.getItem('addTodoTask')).forEach((task) => {
        this.$store.commit('addTodoTask', task);
      });
    },
  },
  mounted() {
    this.initExistedTasks();
    this.getWindowHeight();
    window.addEventListener('resize', this.getWindowHeight);

    if (localStorage.getItem('ringtone')) {
      const data = JSON.parse(localStorage.getItem('ringtone'));

      for (let key in data) {
        this.$store.commit('setRingtone', {
          type: key,
          id: data[key],
        });
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowHeight);
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
}
</style>
