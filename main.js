let nav = 0;
let clicked = null;
let events = localStorage.getItem('events')
	? JSON.parse(localStorage.getItem('events'))
	: [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteModal = document.getElementById('deleteEventModal');
const modalBackDrop = document.getElementById('modalBackDrop');
const titleInputEvent = document.getElementById('eventTitleInput');

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

			const modalDay = `${i - paddingDays}/${month + 1}/${year}`;
			const eventForDay = events.find((e) => e.date === modalDay);

			if (i - paddingDays === day && nav === 0) {
				daySquare.id = 'currentDay';
			}

			if (eventForDay) {
				const eventDiv = document.createElement('div');
				eventDiv.classList.add('event');
				eventDiv.innerText = eventForDay.title;
				daySquare.appendChild(eventDiv);
			}
			daySquare.addEventListener('click', () => openModal(modalDay));
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

	document.getElementById('saveButton').addEventListener('click', saveEvent);
	document.getElementById('cancelButton').addEventListener('click', closeModal);

	document
		.getElementById('deleteButton')
		.addEventListener('click', deleteEvent);
	document.getElementById('closeButton').addEventListener('click', closeModal);
}

function saveEvent() {
	if (titleInputEvent.value) {
		titleInputEvent.classList.remove('error');
		events.push({
			date: clicked,
			title: titleInputEvent.value,
		});
		localStorage.setItem('events', JSON.stringify(events));
		closeModal();
	} else {
		titleInputEvent.classList.add('error');
	}
}

function deleteEvent() {
	events = events.filter((e) => e.date !== clicked);
	localStorage.setItem('events', JSON.stringify(events));
	closeModal();
}

function closeModal() {
	titleInputEvent.classList.remove('error');
	newEventModal.style.display = 'none';
	modalBackDrop.style.display = 'none';
	deleteModal.style.display = 'none';
	titleInputEvent.value = '';
	clicked = null;
	load();
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

function openModal(date) {
	clicked = date;

	const eventForDay = events.find((e) => e.date === clicked);

	if (eventForDay) {
		document.getElementById('eventText').innerText = eventForDay.title;
		deleteModal.style.display = 'block';
	} else {
		newEventModal.style.display = 'block';
	}
	modalBackDrop.style.display = 'block';
}

initButtons();
load();
