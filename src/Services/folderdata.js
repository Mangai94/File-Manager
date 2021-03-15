import inputData from "../folderinfo.json";

export function getData(key) {
	return JSON.parse(localStorage.getItem(key));
}

export function setData(data) {
	let dataString = JSON.stringify(data);
	localStorage.setItem("data", dataString);
}

export function initializeData() {
	setData(inputData);
}

export default {
	initializeData,
	getData,
	setData,
};
