<template>
	<div>
		<h3
			class="title-secondary"
			:class="{ small }"
		>
			ESTIMATED TOMATO
		</h3>

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
	</div>
</template>

<script>
export default {
	props: {
		amount: {
			type: Number,
			required: true,
		},
		tomatoSelected: {
			type: Number,
			required: true,
		},
		dataId: Number,
		small: Boolean,
		pos: String,
	},
	methods: {
		selectTomato(number) {
			this.$emit('update:tomatoSelected', number);
		},
	},
};
</script>
