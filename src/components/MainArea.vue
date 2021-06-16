<template>
  <main class="main-area">
		<component :is="checkType"
    ></component>
  </main>
</template>

<script>
import PendingMain from '@/components/PendingMain';
import ClockMain from '@/components/ClockMain';

export default {
  components: {
    PendingMain,
    ClockMain,
  },
  computed: {
    checkType() {
      return this.$store.getters.taskNotCompleted.length > 0 ? 'ClockMain' : 'PendingMain';
    },
  },
};
</script>
