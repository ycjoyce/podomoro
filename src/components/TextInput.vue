<template>
  <label
    class="text-input-label"
    :class="pos ? `pos-${pos}` : ''"
  >
    <h3 
      class="title-secondary"
      :class="{ small }"
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
    modelValue: {
      type: String,
      required: true,
    },
    small: Boolean,
    pos: String,
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
};
</script>

<style lang="scss" scoped>
  .title-secondary {
    margin-bottom: 10px;
  }
</style>
