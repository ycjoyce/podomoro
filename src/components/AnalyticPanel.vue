<template>
  <div class="panel-outer-container">
    <h2 class="title-primary">
			ANALYTICS REPORT
		</h2>

		<div class="analytic-number">
      <h3 class="title-secondary">
				TOMATOES OF THIS WEEK
			</h3>

      <AnalyticNumberList
        :week="wholeWeek"
      />
    </div>

    <div class="analytic-chart">
			<h3 class="title-secondary">
				CHART

				<span class="title-week">
					{{formattedDate(wholeWeek[0]).date}}-{{formattedDate(wholeWeek[6]).date}}
				</span>
			</h3>

			<AnalyticChartList
        :week="wholeWeek"
      />
		</div>

		<div class="button-area">
			<MyButton
				title="PREV"
				type="primary"
				:borderStyle="true"
				:method="changeWeek.bind(null, 'prev')"
        pos="analytic-panel"
			/>

			<MyButton
				title="NEXT"
				type="secondary"
				:borderStyle="true"
				:method="changeWeek.bind(null, 'next')"
        pos="analytic-panel"
			/>
		</div>
  </div>
</template>

<script>
import mixin from '@/mixin';
import AnalyticNumberList from '@/components/AnalyticNumberList';
import AnalyticChartList from '@/components/AnalyticChartList';
import MyButton from '@/components/MyButton';

export default {
  mixins: [mixin],
  components: {
    AnalyticNumberList,
    AnalyticChartList,
    MyButton,
  },
  data() {
    return {
      wholeWeek: [],
      prevCount: 0,
      nextCount: 0,
    };
  },
  computed: {
    originalWeekDates() {
      const prevDaysLength = new Date().getDay();
			const nextDaysLength = 7 - (new Date().getDay() + 1);
			let wholeWeek = [];

			for (let i = 0; i < prevDaysLength; i++) {
        let newDate = new Date();
				newDate.setDate(newDate.getDate() - i - 1);
				wholeWeek.unshift(newDate);
			}

			for(let j = 0; j <= nextDaysLength; j++) {
        let newDate = new Date();
				newDate.setDate(newDate.getDate() + j);
				wholeWeek.push(newDate);
			}

			return wholeWeek;
    },
  },
  methods: {
    changeWeek(direction) {
      let newWeek = [];

      switch (direction) {
        case 'prev':
          this.prevCount++;
          newWeek = this.originalWeekDates.map((day) => (
            day.getDate() - 7 * (this.prevCount - this.nextCount)
          ));
          break;
        case 'next':
          this.nextCount++;
          newWeek = this.originalWeekDates.map((day) => (
            day.getDate() + 7 * (this.nextCount - this.prevCount)
          ));
          break;
        default:
          break;
      }

      if (newWeek.length < 1) {
        return;
      }

      this.wholeWeek = newWeek.map((day) => (
        new Date(new Date().setDate(day))
      ));
    },
  },
  created() {
    this.wholeWeek = this.originalWeekDates;
  },
};
</script>

<style lang="scss" scoped>
  .panel-title {
		&.secondary {
			margin-bottom: 10px;
		}
	}

  .button-area {
		display: flex;
		margin-top: 30px;
		justify-content: space-between;
	}
</style>
