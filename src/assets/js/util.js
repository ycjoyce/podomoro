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