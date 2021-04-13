<template>
  <ul class="list chart-list">
    <li
      v-for="m in 7"
      :key="m"
      class="chart-item"           
    >
      <div class="chart-pies">
        <span class="chart-pies-amount"
          v-if="getProgressAmount(week[m - 1]) > 0"
        >
          {{getProgressAmount(week[m - 1])}}
        </span>

        <span
          class="chart-pies-pie"
          v-for="n in getProgressAmount(week[m - 1])"
          :key="n"
        ></span>
      </div>

      <p class="chart-date">
        <span class="chart-date-text date">
          {{formattedDate(week[m - 1]).date}}
        </span>

        <span class="chart-date-text weekday">
          {{formattedDate(week[m - 1]).weekday}}
        </span>
      </p>
    </li>
  </ul>
</template>

<script>
import mixin from '../mixin';

export default {
  mixins: [mixin],  
  props: {
    week: {
      type: Array,
      required: true,
    },
  },
}
</script>