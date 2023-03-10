// Targeting search button by ID  
var fetchButton = document.getElementById('fetch-button');
var addButton = document.getElementById('add');
var clearButton = document.getElementById('clear-button');
var recipeCard = document.getElementById('recipe');
var savedList = document.getElementById('savedList');
var storedRecipes = [];
//var savedList = getElementById('savedList');

function getApi() {

  // Getting the API url and inserting the user's search to show correlating results.
  var userSearch = document.getElementById('userSearch').value;
  var requestUrl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=f77fd2f488d240c483a26996e70388ac&number=10&query=' + userSearch + '&instructionsRequired=true&addRecipeInformation=true';
  var urlResults = [];
  var resultsCard = document.getElementById('results');


  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      for (var i = 0; i < data.results.length; i++) {
        // Parsing the information and creating an paragraph with the title and an anchor tag with the url of the results.
        var sourceUrl = data.results[i].sourceUrl;
        var recipeDiv = document.createElement('div');
        var recipeTitle = document.createElement('p');
        var recipeLink = document.createElement('a');
        var addButton = $('<button></button>');
        addButton.attr('type', 'button');
        addButton.attr('id', 'add_button');
        addButton.text('add');

        // Making the <a> tags clickable links.
        recipeLink.setAttribute('href', sourceUrl);
        recipeLink.setAttribute('target', '_blank');
        recipeLink.setAttribute('id', 'recipe_link');
        recipeTitle.setAttribute('id', 'recipe_title');

        // Adding the recipe title to display with the url.
        recipeTitle.innerHTML = data.results[i].title;
        recipeLink.innerHTML = sourceUrl;
        recipeDiv.append(recipeTitle, recipeLink);

        
        resultsCard.append(recipeDiv);
        

        recipeLink.classList.add('recipeUrl');
      };

      urlResults.push(sourceUrl);

    }
    );
};

//Adding event listener to make buttons display results and add URLs to
fetchButton.addEventListener('click', getApi);
if (localStorage.getItem('savedRecipe')) {
  storedRecipes = JSON.parse(localStorage.getItem('savedRecipe'));
  // add for loop for notes  to load upon page load (from local)
  for (var i = 0; i < storedRecipes.length; i++) {
    var recipeLink = document.createElement('a');
    var breakEl = document.createElement('br');
    recipeLink.innerHTML = storedRecipes[i];
   //When a link is clicked it will open up in a new tab rather than redirection your current webpage.
    recipeLink.setAttribute('href', storedRecipes[i]);
    recipeLink.setAttribute('target', '_blank');
    savedList.append(recipeLink);
    savedList.append(breakEl);
  }
} else {
  localStorage.setItem('savedRecipe', JSON.stringify(storedRecipes));
}
// Adding designated recipes to local storage and displaying them on the page on reload.
addButton.addEventListener('click', function () {
  var addRecipe = document.getElementById('addRecipe');
  var recipeLink = document.createElement('a');
  var breakEl = document.createElement('br');
  recipeLink.innerHTML = addRecipe.value;
  recipeLink.setAttribute('href', addRecipe.value);
  recipeLink.setAttribute('target', '_blank');
  savedList.append(recipeLink);
  savedList.append(breakEl);
  storedRecipes.push(addRecipe.value);
  localStorage.setItem('savedRecipe', JSON.stringify(storedRecipes))
  addRecipe.value = '';

});

// Adding button for clearing the local storage as well as items from saved recipes list.
clearButton.addEventListener('click', function() {
  console.log('click')
  localStorage.removeItem('savedRecipe')
  savedList.innerHTML = ''
});