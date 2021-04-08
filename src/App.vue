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
import Modal from './components/Modal';
import MainArea from './components/MainArea';
import AsideArea from './components/AsideArea';

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
  },
  mounted() {
    this.getWindowHeight();
    window.addEventListener('resize', this.getWindowHeight);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowHeight);
  },
}
</script>

<style lang="scss">
#app {
  display: flex;
}
</style>
