<template>
  <div class="title-area">
    <h2 class="title-title">
      {{task.title}}
    </h2>

    <span
      v-if="$store.state.curTask.status === 'break'"
      class="title-break-state"
    >
      break
    </span>

    <ul
      class="title-count-list"
      v-else
    >
      <li
        v-for="n in task.tomatoes"
        :key="n"
        class="title-count-item"
      >
        <span
          class="title-count-circle"
          :class="{
            completed: getCompletedCircle(task, n - 1) || n <= $store.state.curTask.completeCircles
          }"
        ></span>
      </li>
    </ul>
  </div>
</template>

<script>
import mixin from '../mixin';

export default {
  mixins: [mixin],
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
}
</script>
