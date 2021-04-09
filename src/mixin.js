module.exports = {
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
  },
};