<template>
  <main
		class="main-area"
	>
		<component :is="checkType"></component>
  </main>
</template>

<script>
import PendingMain from './PendingMain';
import ClockMain from './ClockMain';

export default {
  components: {
    PendingMain,
    ClockMain,
  },
  computed: {
    checkType() {
      return 'ClockMain';
    },
  },
}
</script>
