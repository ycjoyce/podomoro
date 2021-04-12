export function setStorage(storage, data) {
  if (!localStorage) {
		throw new Error("localStorage doesn't exist.");
	}

  let list = !localStorage[storage] ? [] : JSON.parse(localStorage[storage]);

	if (!Array.isArray(list)) {
		list = [];
	}

	list = list.concat(data);

	localStorage.setItem(storage, JSON.stringify(list));
}

export function deleteDataInStorage(storage, targetId) {
	let originalStorage = JSON.parse(localStorage.getItem(storage));
	const targetIndex = originalStorage.findIndex((item) => item.id === targetId);

	originalStorage.splice(targetIndex, 1);
	localStorage.removeItem(storage);
	setStorage(storage, originalStorage);
}

export function updateStorage({
	storage = 'addTodoTask', targetId, column, data, whetherClearProgress
}) {
	let originalStorage = JSON.parse(localStorage.getItem(storage));
	const targetIndex = originalStorage.findIndex((item) => item.id === targetId);
	let newTask = originalStorage[targetIndex];

	if (column === 'progress') {
		updateProgress();
	} else {
		newTask[column] = data;
	}

	originalStorage.splice(targetIndex, 1, newTask);
	localStorage.removeItem(storage);
	setStorage(storage, originalStorage);

	function updateProgress() {
		if (!whetherClearProgress) {
			const dateIndex = newTask[column].findIndex((item) => item.date === data.date);
			if (dateIndex < 0) {
				originalStorage[targetIndex].progress.push(data);
				return;
			}
			originalStorage[targetIndex].progress[dateIndex].count = data.count;
			return;
		}
		const len = originalStorage[targetIndex].progress.length;
		originalStorage[targetIndex].progress.splice(0, len, data);
	}
}