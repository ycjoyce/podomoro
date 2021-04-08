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
      return 'PendingMain';
    },
  },
}
</script>

<style lang="scss" scoped>
	.main-area {
		background-color: $gray-light;
		height: 100%;
		flex: 1 1 50%;
		overflow-y: scroll;
	}
</style>