<template>
  <button
    :class="[
      'my-button',
      type,
      { 'border': borderStyle },
      pos ? `pos-${pos}` : '',
    ]"
    @click="method"
  >
    {{title}}
  </button>
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
      required: true,
    },
    method: {
      type: Function,
      required: true,
    },
    borderStyle: Boolean,
    pos: String,
  },
};
</script>
