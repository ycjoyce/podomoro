<template>
  <div
		class="tomato-container"
		:data-id="dataId"
	>
    <button
			v-for="n in amount"
			:key="n"
			:data-number="n"
			class="tomato-btn"
			:class="{ selected: n <= tomatoSelected }"
			@click="selectTomato(n)"
    ></button>
  </div>
</template>

<script>
export default {
	props: {
		amount: {
			type: Number,
			required: true,
		},
		dataId: {
			type: Number,
			required: false,
		},
		tomatoSelected: {
			type: Number,
			required: true,
		},
	},
	methods: {
		selectTomato(number) {
			this.$emit('update:tomatoSelected', number);
		},
	},
}
</script>
