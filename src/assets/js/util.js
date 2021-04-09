export function setStorage(column, data) {
  if (!localStorage) {
		throw new Error("localStorage doesn't exist.");
	}

  let list = !localStorage[column] ? [] : JSON.parse(localStorage[column]);

	if (!Array.isArray(list)) {
		list = [];
	}

	list = list.concat(data);

	localStorage.setItem(column, JSON.stringify(list));
}

export function deleteDataInStorage(column, targetId) {
	let originalStorage = JSON.parse(localStorage.getItem(column));
	const targetIndex = originalStorage.findIndex((item) => item.id === targetId);

	originalStorage.splice(targetIndex, 1);
	localStorage.removeItem(column);
	setStorage(column, originalStorage);
}