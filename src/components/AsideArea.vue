<template>
  <aside class="aside-area">
		<ButtonBar/>
		<Panel/>
  </aside>
</template>

<script>
import ButtonBar from './ButtonBar';
import Panel from './Panel';

export default {
	components: {
		ButtonBar,
		Panel,
	},
}
</script>

<style lang="scss" scoped>
  .aside-area {
    flex-shrink: 1;
    height: 100%;
    display: flex;
    background-color: $black;

    @include rwd(mobile) {
      flex-direction: column-reverse;
    }
  }
</style>