var fetchButton = document.getElementById('fetch-button');

function getApi() {
  // fetch request gets a list of all 
  var requestlatlongUrl = 'http://api.openweathermap.org/geo/1.0/zip?zip=95991&appid=301abb42e89fddd7a250ac02d53fe894';

  fetch(requestlatlongUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      var longitude = data.lon
      var latitude = data.lat
      console.log(longitude, latitude)
      var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=301abb42e89fddd7a250ac02d53fe894'
      fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data)
        })
    });
};

fetchButton.addEventListener('click', getApi);








// -------------------------------modal----------------------------------
var myModal = document.getElementById('fetch-button');

addnote.addEventListener('click', myModal);


$('#myModal').modal(options)