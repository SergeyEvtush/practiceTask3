"use strict";

const form = document.querySelector('#form-convert'),
	select = form.querySelector('#choise-currency-result'),
	inputEnter=form.querySelector('#task'),
	inputOutput = form.querySelector('#result'),
	convertButton=form.querySelector('#c-btn'),
	reverseButton=form.querySelector('#rev-btn');


 const getData = (url) => {
	 return fetch(url)
		 .then(data => data.json())
		 .catch(errorData => console.log(errorData));
};
const createOption = ({CharCode, Name}) => {
	return `<option value="${CharCode}">${Name}</option>`
};
const makeOPtions = (obj, parent) => {
	for (const key in obj) {
		parent.insertAdjacentHTML('afterbegin', createOption(obj[key]));
	}
};
const convertTo = (rub, currensy, action=true) => {
	if (action) {
		return rub / currensy;
	} else {
		return currensy * rub;
	}
};




getData('https://www.cbr-xml-daily.ru/daily_json.js')
	.then(data => {
		console.log(data);
		makeOPtions(data.Valute, select);

		convertButton.addEventListener('click', (e) => {
			e.preventDefault();
			let flag = true;
			const currensy = data.Valute[select.value].Value;
			const activeElem = document.querySelector('.active');
			const rubles = activeElem.value;
			inputOutput.classList.contains('active') ? flag = false : flag = true;
			form.querySelector('.no-active').value = convertTo(rubles, currensy,flag).toFixed(3);
		});
		reverseButton.addEventListener('click', (e) => {
			e.preventDefault();
			form.querySelector('#result').classList.toggle('active');
			form.querySelector('#result').classList.toggle('no-active');
			form.querySelector('#task').classList.toggle('active');
			form.querySelector('#task').classList.toggle('no-active');
			form.querySelector('.active').removeAttribute('readonly');
			form.querySelector('.no-active').setAttribute("readonly", true);
			console.log(form.querySelector('no-active'));
			inputOutput.value = '';
			inputEnter.value = '';
		});
	});

