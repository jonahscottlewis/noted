// Targeting search button by ID  
var fetchButton = document.getElementById('fetch-button');
var addButton = document.getElementById('add');
var recipeCard = document.getElementById('recipe');

function getApi() {


  var userSearch = document.getElementById('userSearch').value;
  var requestUrl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=f77fd2f488d240c483a26996e70388ac&number=10&query=' + userSearch + '&instructionsRequired=true&addRecipeInformation=true';
  var urlResults = [];
  var recipeCard = document.getElementById('recipe');

  
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      for (var i = 0; i < data.results.length; i++) {
        // parsing the information and creating an paragraph with the title and an anchor tag with the url of the results.
        var sourceUrl = data.results[i].sourceUrl;
        var recipeTitle = document.createElement('p');
        var recipeLink = document.createElement('a');
        // making the <a> tags clickable links.
        recipeLink.setAttribute('href', sourceUrl);
        recipeLink.setAttribute('target', '_blank');
        recipeTitle.innerHTML = data.results[i].title;
        recipeLink.innerHTML = sourceUrl;
        
        recipeCard.appendChild(recipeTitle);
        recipeCard.appendChild(recipeLink);

        recipeLink.classList.add('recipeUrl');
      };

      urlResults.push(sourceUrl);
      sourceUrl.push(recipeTitle);
      
    }
    );
};

function addRecipe() {
  var list = document.getElementById('addRecipe').value;

  for (var i=0; i < list; i++) {
    var savedList = getElementById('savedList')
    var listItem = document.createElement('li')
    listItem.appendChild(savedList);
  }
}

//Adding event listener to make buttons display results and add URLs to
fetchButton.addEventListener('click', getApi);
addButton.addEventListiner('click', addRecipe);
