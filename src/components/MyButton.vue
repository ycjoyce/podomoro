<template>
  <button
    class="my-button"
    :class="[
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
    borderStyle: {
      type: Boolean,
      required: false,
    },
    pos: {
      type: String,
      required: false,
    },
    method: {
      type: Function,
      required: true,
    },
  },
}
</script>