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
    completedCircleAmt() {
      return (data) => {
        if (!Array.isArray(data.progress) || data.progress.length < 1) {
					return 0;
				}
        return data.progress.reduce((a, e) => a + e.count, 0);
      }
    },
    getCompletedCircle() {
			return (data, tomatoIndex) => (
        tomatoIndex + 1 <= this.completedCircleAmt(data)
      );
		},
		calArrSum() {
      return (arr) => {
        if (!Array.isArray(arr) || arr.length < 1) {
          return 0;
        }
        return arr.reduce((a, e) => a + e, 0);
      }
    },
		getProgressAmount() {
      return (dateIns) => {
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
      return (dateIns) => {
        const month = dateIns.getMonth() + 1;
        const day = dateIns.getDate();
        const weekday = this.weekday[dateIns.getDay()];
        return {
					date: `${month}/${day}`,
					weekday,
				};
      }
    },
    formattedTime() {
      return (sec) => {
        const mins = Math.floor(sec / 60);
        const secs = sec - mins * 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
      }
    },
  },
};