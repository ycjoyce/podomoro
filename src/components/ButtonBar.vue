<template>
  <div
    class="button-bar"
    :class="{ 'to-close': !panelShow }"   
  >
    <button
			v-for="page in pages"
			:key="page"
			class="btn-change-page"
			:data-type="page"
			@click="switchPage(page)"
    >
			<img :src="getPageIcon(page)">
    </button>

    <button
			class="btn-toggle-open" 
			:class="{ 'to-close': !panelShow }"
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
  props: {
    curPage: String,
    panelShow: Boolean,
  },
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
        const color = this.curPage === page ? 'red' : 'white';
        return require(`@/assets/img/${page}_${color}.svg`);
      };
    },
  },
  methods: {
    switchPage(page) {
      this.$emit('switchPage', page);
    },
    togglePanel(buttonStatus) {
      this.$emit('togglePanel', !(buttonStatus === 'to-close'));
			this.buttonStatus = buttonStatus === 'to-close' ? 'to-open' : 'to-close';
    }
  },
};
</script>
