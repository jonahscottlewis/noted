let currentMonth = 0;

// user selecting the month
let picked = null;

// checking local storage if 'events' is true (?); if not true(:) then we will get an blankSquare string [] back!;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newModal = document.getElementById('newModal');
const deleteModal = document.getElementById('deleteModal');
const background = document.getElementById('modal-bg');
const newEventTitle = document.getElementById('newEventTitle');
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// modal will connect the event created to the date/month/year the user selected;
function openModal(date) {
  picked = date;

  const eventForDay = events.find(e => e.date === picked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteModal.style.display = 'block';
  } else {
    newModal.style.display = 'block';
  }

  background.style.display = 'block';
}


// tracks in realtime what the current date/month/year is whenever user goes to webpage;
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

  // blankspaces will take up the empty spaces per month to equal 7 days per row;
  const blankSpaces = weekDays.indexOf(dateString.split(', ')[0]);

  // shows the full spelling of the current month on the webpage;
  document.getElementById('monthShown').innerText =
    `${newDay.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  // combining the correct days per month + blank spaces to fill the rest of the space;
  for (let i = 1; i <= blankSpaces + daysEachMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');
    
    const dayString = `${month + 1}/${i - blankSpaces}/${year}`;

    if (i > blankSpaces) {
      daySquare.innerText = i - blankSpaces;

      const eventForDay = events.find(e => e.date === dayString);

      // currentDay will be shown in the month via different color scheme from CSS;
      if (i - blankSpaces === day && currentMonth === 0) {
        daySquare.id = 'currentDay';
      }

      // everytime user puts in a new event/task into calendar;
      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('eventMade');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      // modal will pop up whenver user clicked on a calendar day;
      daySquare.addEventListener('click', () => openModal(dayString));

    } else {
      daySquare.classList.add('square-padding');
    }

    // puts information into the calendar;
    calendar.appendChild(daySquare);
  }
}

// selecting an active event/task then user decides to cancel/close it;
function closeModal() {
  newEventTitle.classList.remove('error');
  newModal.style.display = 'none';
  deleteModal.style.display = 'none';
  background.style.display = 'none';
  newEventTitle.value = '';
  picked = null;
  refresh();
}

// user saving a new event/task will get an error is there is no text inputted;
// user completing the text input will have their event/task placed into the date selected;
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

// event/task will disappear from calendar after user decides to delete it;
function deleteEvent() {

  events = events.filter(e => e.date !== picked);
  localStorage.setItem('events', JSON.stringify(events));

  closeModal();
}

// the next and back buttons focus on changing the months;
// the last four buttons are listening for user clicking on modal button;
function allButtons() {

  document.getElementById('next-Btn').addEventListener('click', () => {
    currentMonth++; refresh();

  });

  document.getElementById('back-Btn').addEventListener('click', () => {
    currentMonth--; refresh();

  });

  document.getElementById('save-Btn').addEventListener('click', saveEvent);
  document.getElementById('cancel-Btn').addEventListener('click', closeModal);
  document.getElementById('delete-Btn').addEventListener('click', deleteEvent);
  document.getElementById('close-Btn').addEventListener('click', closeModal);
}

allButtons();
refresh();