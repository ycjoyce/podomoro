<template>
  <div
    class="button-bar"
    :class="{ 'to-close': !$store.state.panelShow }"   
  >
    <button
			v-for="(page, index) in pages"
			:key="index"
			class="btn-change-page"
			:data-type="page"
			@click="switchPage(page)"
    >
			<img :src="getPageIcon(page)">
    </button>

    <button
			class="btn-toggle-open" 
			:class="{ 'to-close': !$store.state.panelShow }"
			@click="togglePanel(buttonStatus)"
    >
			<img
				:src="require('@/assets/img/tomato_small_color.svg')"
				class="btn-toggle-open-img tomato"
			>

			<img
				:src="require('@/assets/img/arrow.svg')"
				class="btn-toggle-open-img arrow"
			>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: [
        'add', 'list', 'analysis', 'ringtone'
      ],
      buttonStatus: 'to-close',
    };
  },
  computed: {
    getPageIcon() {
      return (page) => {
        const color = this.$store.state.curPage === page ? 'red' : 'white';
        return require(`@/assets/img/${page}_${color}.svg`);
      }
    },
  },
  methods: {
    switchPage(page) {
      this.$store.commit('switchPage', page);
    },
    togglePanel(buttonStatus) {
      if (buttonStatus !== 'to-close' && buttonStatus !== 'to-open') {
				return;
			}
			const	oppositeStatus =  buttonStatus === 'to-close' ? 'to-open' : 'to-close';
			this.$store.commit('togglePanel', buttonStatus);
			this.buttonStatus = oppositeStatus;
    }
  },
}
</script>
