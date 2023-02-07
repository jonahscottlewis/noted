// 0 = Jan; 1 = Feb; 3 = Mar; etc.
let currentMonth = 0;

// whichever day user selected;
let selectedMonth = null;

// checking local storage if 'events' is true (?); if not true(:) then we will get an empty string [] back!;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

// 
const calendarMonth = document.getElementById('calendar');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function gettingDate() {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDayEachMonth = new Date(year, month, 1);
  // 0 = last day of the previous month;
  // example: 0 + 1 = Jan + 1 = Feb
  const daysPerMonth = new Date(year, month + 1, 0);

  // adding 'en-us' will use the English language; 'long' = full spelling of weekday;
  const dateString = firstDayEachMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',

  });

  // emptySquare lets the user know there isn't an actual date in that square;
  const emptySqaure = weekdays.indexOf(dateString.split(', ')[0]);

  // will spell out the entire name of the month instead of showing a number or abbreviated version;
  document.getElementById('currentMonth').innerText = `${date.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendarMonth.innerHTML = '';

  // creating empty squares and date squares;
  for (let i = 1; i <= emptySqaure + daysPerMonth; i++) {

    // creating a div class="day" whenever an actualDay is there;
    const actualDayInSquare = document.createElement('div');
    actualDayInSquare.classList.add(`day`);

    // creating an empty/blank square or a square with a date inside of it;
    if (i > emptySqaure) {

      // this will give us the correct date of the square we are currently at;
      actualDayInSquare.innerText = i - emptySqaure;

      // whenever the user clicks in a dated square;
      actualDayInSquare.addEventListener('click', function () { console.log('click') });

    } else {
      // distinguishing between an empty/blank square over dated square;
      actualDayInSquare.classList.add('empty');
    }

    calendarMonth.appendChild(actualDayInSquare);

  };
}

// 
function calButtons() {
  document.getElementById('nextButton').addEventListener('click',
    function () {
      selectedMonth++; gettingDate();
    });

  document.getElementById('previousButton').addEventListener('click',
    function () {
      selectedMonth--; gettingDate();
    });
}

calButtons();
gettingDate();