var fetchButton = document.getElementById('fetch-button');

function getApi() {

  var userSearch = document.getElementById('userSearch').value;
  var requestUrl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=f77fd2f488d240c483a26996e70388ac&number=10&query=' + userSearch + '&instructionsRequired=true&addRecipeInformation=true';
  var urlResults = [];

  //
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      for (var i = 0; i < 10; i++) {
        var sourceUrl = data.results[i].sourceUrl;
        var recipeTitle = document.createElement('p');
        var recipeLink = document.createElement('a');
        recipeLink.setAttribute('href', sourceUrl);
        recipeLink.setAttribute('target', '_blank');
        recipeTitle.innerHTML = data.results.title;
        recipeLink.innerHTML = sourceUrl;
        document.body.appendChild(recipeLink);
      }

      urlResults.push(sourceUrl);
      sourceUrl.push(recipeTitle);
      
    }
    );
};

fetchButton.addEventListener('click', getApi);