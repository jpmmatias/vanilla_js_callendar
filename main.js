let nav = 0;
let clicked = null;
let events = localStorage.getItem('events')
	? JSON.parse(localStorage.getItem('events'))
	: [];

const calendar = document.querySelector('#calendar');
const weekdays = [
	'Domingo',
	'Segunda-feira',
	'Terça-feira',
	'Quarta-feira',
	'Quinta-feira',
	'Sexta-feira',
	'Sabado',
];

function load() {
	const date = new Date();

	if (nav !== 0) {
		date.setMonth(new Date().getMonth() + nav);
	}

	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();

	const firstDayOfMonth = new Date(year, month, 1);
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	const dateString = firstDayOfMonth.toLocaleDateString('pt-br', {
		weekday: 'long',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	});

	const paddingDays = weekdays.indexOf(
		capitalizeFirstLetter(dateString.split(', ')[0])
	);

	updateHeaderDivWithMonth(date, year);

	calendar.innerHTML = '';

	for (let i = 1; i <= paddingDays + daysInMonth; i++) {
		const daySquare = document.createElement('div');
		daySquare.classList.add('day');

		if (i > paddingDays) {
			daySquare.innerText = i - paddingDays;

			daySquare.addEventListener('click', () => console.log('click'));
		} else {
			daySquare.classList.add('padding');
		}

		calendar.appendChild(daySquare);
	}
}

function initButtons() {
	document.getElementById('nextButton').addEventListener('click', () => {
		nav++;
		load();
	});

	document.getElementById('backButton').addEventListener('click', () => {
		nav--;
		load();
	});
}

function updateHeaderDivWithMonth(date, year) {
	const monthFormated = capitalizeFirstLetter(
		date.toLocaleDateString('pt-br', {
			month: 'long',
		})
	);

	document.getElementById(
		'monthDisplay'
	).innerText = `${monthFormated} ${year}`;
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

initButtons();
load();
