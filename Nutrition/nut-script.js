var fetchButton = document.getElementById('fetch-button');

function getApi() {

  var userSearch = document.getElementById('userSearch').value;
  var requestUrl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=f77fd2f488d240c483a26996e70388ac&number=10&query=' + userSearch + '&instructionsRequired=true&addRecipeInformation=true';
  var urlResults = [];

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      for (var i = 0; i < 10; i++) {
        var sourceUrl = data.results[i].sourceUrl
        var createHeader = document.createElement('a');
        createHeader.setAttribute('href', sourceUrl);
        createHeader.setAttribute('target', '_blank')
        createHeader.innerHTML = sourceUrl;
        document.body.appendChild(createHeader);
      }

      // Setting the text of link and the href of the link
      link.textContent = data[i].html_url;
      link.href = data[i].html_url;


      urlResults.push(sourceUrl);
    }
    );
};

fetchButton.addEventListener('click', getApi);