<template>
  <ul class="list number-list">
    <li class="number-item today">
      <span class="number-amount">
        {{getProgressAmount(new Date())}}
      </span>

      <span class="number-title">
        TODAY
      </span>
    </li>

    <li class="number-item week">
      <span class="number-amount">
        {{weekProgressSum}}
      </span>

      <span class="number-title">
        {{formattedDate(week[0]).date}}-{{formattedDate(week[6]).date}}
      </span>
    </li>
  </ul>
</template>

<script>
import mixin from '@/mixin';

export default {
  mixins: [mixin], 
  props: {
    week: {
      type: Array,
      required: true,
    },
  }, 
  computed: {
    weekProgressSum() {
			return this.calArrSum(
        this.week.map((day) => this.getProgressAmount(day))
      );
    },
  },
};
</script>
