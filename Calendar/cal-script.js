const calendar = document.querySelector('#calendar');

const weekendIsHere = function (day) {
    // this will create the 7 day week;
    // 6 when it's saturday, 0 when it's sunday;
    return day % 7 === 6 || day & 7 === 0;
};


// day of the week will be marked as the first of the month until the 31st of the month;
for (let day = 1; day <= 31; day++) {

    const weekend = weekendIsHere(day)
    console.log (weekend ? "weekend" : "");

    // insert.adjacent.HTML add texts to a specific location on the page; 
    // beforeend = means to add text before the end of an element;
    calendar.insertAdjacentHTML("beforeend", 
    // checking to see if the weekend is true(?) if not(:) then it will return an empty string;
    `<div class="day ${weekend ? "weekend" : ""}"> ${day} </div>`);
};
