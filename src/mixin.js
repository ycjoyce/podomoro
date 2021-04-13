module.exports = {
	data() {
		return {
			weekday: {
        0: 'SUN',
				1: 'MON',
				2: 'TUE',
				3: 'WED',
				4: 'THU',
				5: 'FRI',
				6: 'SAT',
      },
		};
	},
  computed: {
    getCompletedCircle() {
			return function(data, tomatoIndex) {
				if (!Array.isArray(data.progress)) {
					return;
				}
        let totalCount = data.progress.reduce((a, e) => a + e.count, 0);
        return tomatoIndex + 1 <= totalCount;
			};
		},
		calArrSum() {
      return function(arr) {
        if (!Array.isArray(arr) || arr.length < 1) {
          return 0;
        }
        return arr.reduce((a, e) => a + e, 0);
      }
    },
		getProgressAmount() {
      return function(dateIns) {
        const date = dateIns.toLocaleDateString();
        const amountArr = this.$store.state.todoTask.filter((task) => (
          task.progress.some((el) => el.date === date)
        )).map((task) => (
          task.progress.find((el) => el.date === date).count
        ));
        return this.calArrSum(amountArr);
      }
    },
		formattedDate() {
      return function(dateIns) {
        const month = dateIns.getMonth() + 1;
        const day = dateIns.getDate();
        const weekday = this.weekday[dateIns.getDay()];
        return {
					date: `${month}/${day}`,
					weekday,
				};
      }
    },
  },
};