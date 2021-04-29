<template>
  <div class="content-title-box">
    <p
      class="content-title"
      :class="{
        done: type === 'DONE',
        active: data.id === $store.state.curTask,
      }"
    >
      <span class="content-title-text">
        {{data.title}}
      </span>

      <ul class="content-title-count-list">
        <li
          v-for="tomato in data.tomatoes"
          :key="tomato"
          class="content-title-count-item"
        >
          <span
            class="content-title-count-circle"
            :class="{ completed: completedCircles(data.id, tomato) }"
          ></span>
        </li>
      </ul>
    </p>

    <button
      class="content-title-open-panel"
      :class="{
        'to-close': editPanelOpened === `${type}-${index}`
      }"
      @click="toggleEditPanel(`${type}-${index}`)"
    >
      <span
        class="dot"
        v-for="n in 3"
        :key="n"
      ></span>
    </button>
  </div>
</template>

<script>
import mixin from '../mixin';

export default {
  mixins: [mixin],
  props: {
    data: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    editPanelOpened: {
      type: String,
      required: false,
    },
  },
  computed: {
    completedCircles() {
      return (id, tomato) => {
        if (!this.data.completed) {
          if (id === this.$store.state.curTask.id) {
            return tomato <= this.$store.state.curTask.completedCircles;
          }
          return false;
        }
        return this.getCompletedCircle(this.data, tomato);
      }
    },
  },
  methods: {
    toggleEditPanel(index) {
      this.$emit('toggleEditPanel', index);
    },
  },
}
</script>