<template>
  <label
    class="text-input-label"
    :class="pos ? `pos-${pos}` : ''"
  >
    <h3 
      class="title-secondary"
      :class="{ small: type === 'small' }"
    >
      {{title}}
    </h3>
    
    <input
      class="text-input-input"
      type="text"
      v-model="value"
    >
  </label>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
      required: true,
    },
    pos: {
      type: String,
      required: false,
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
}
</script>
