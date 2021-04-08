<template>
  <div class="modal-container">
		<div class="modal-bgc"></div>

		<div class="modal-dialog">
			<h3 class="modal-title">
				{{data.title}}
			</h3>

			<div
				v-html="paragraphSplitting(data.content)"
			></div>
			
			<div
				class="modal-btn-area"
				v-if="data.button"
			>
				<MyButton 
					v-for="(btn, btnIndex) in data.button"
					:key="btnIndex"
					:title="btn.title"
					:type="btn.type"
					:method="btn.method"
          pos="modal"
				/>
			</div>
		</div>
  </div>
</template>

<script>
import MyButton from './MyButton';

export default {
  props: {
		data: {
			type: Object,
			required: true,
		},
	},
  components: {
		MyButton,
	},
  computed: {
    paragraphSplitting() {
      return function(content) {
				return `
					<p class="modal-content">
						${content.split('\n').join('</p><p class="modal-content">')}
					</p>
				`;
			}
    },
  },
}
</script>