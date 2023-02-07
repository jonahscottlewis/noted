let currentMonth = 0;
let picked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newModal = document.getElementById('newModal');
const deleteModal = document.getElementById('deleteModal');
const background = document.getElementById('modal-bg');
const newEventTitle = document.getElementById('newEventTitle');
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  picked = date;

  const eventForDay = events.find(function (event) { event.date === picked });

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteModal.style.display = 'block';
  } else {
    newModal.style.display = 'block';
  }

  background.style.display = 'block';
}

function refresh() {
  const newDay = new Date();

  if (currentMonth !== 0) {
    newDay.setMonth(new Date().getMonth() + currentMonth);
  }

  const day = newDay.getDate();
  const month = newDay.getMonth();
  const year = newDay.getFullYear();

  const firstDayPerMonth = new Date(year, month, 1);
  const daysEachMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayPerMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const blankSpaces = weekDays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthShown').innerText =
    `${newDay.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for (let i = 1; i <= blankSpaces + daysEachMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - blankSpaces}/${year}`;

    if (i > blankSpaces) {
      daySquare.innerText = i - blankSpaces;

      const eventForDay = events.find(function (event) { event.date === dateString });

      if (i - blankSpaces === day && currentMonth === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('events');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', function () { openModal(dayString) });
    } else {
      daySquare.classList.add('square-padding');
    }

    calendar.appendChild(daySquare);
  }
}

function closeModal() {
  newEventTitle.classList.remove('error');
  newModal.style.display = 'none';
  deleteModal.style.display = 'none';
  background.style.display = 'none';
  newEventTitle.value = '';
  picked = null;
  refresh();
}

function saveEvent() {
  if (newEventTitle.value) {
    newEventTitle.classList.remove('error');

    events.push({
      date: picked,
      title: newEventTitle.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    newEventTitle.classList.add('error');
  }
}

function deleteEvent() {

  events = events.filer(function (event) { event.date !== picked });
  localStorage.setItem('events', JSON.stringify(events));
  
  closeModal();
}

function allButtons() {
  document.getElementById('next-Btn').addEventListener('click',
    function () {
      currentMonth++; refresh();

    });

  document.getElementById('back-Btn').addEventListener('click',
    function () {
      currentMonth--; refresh();

    });

  document.getElementById('save-Btn').addEventListener('click', saveEvent);
  document.getElementById('cancel-Btn').addEventListener('click', closeModal);
  document.getElementById('delete-Btn').addEventListener('click', deleteEvent);
  document.getElementById('close-Btn').addEventListener('click', closeModal);
}

allButtons();
refresh();