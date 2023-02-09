
    // Define the list items
    var items = ['Bread', 'Milk', 'Eggs', 'Cheese'];

    // Get the list element
    var list = document.getElementById('grocery-list');

    // Loop through the items and add them to the list
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var li = document.createElement('li');
      li.innerHTML = item;
      list.appendChild(li);
    }

const shoppingList = [
  { item: 'Milk', quantity: 2, purchased: false },
  { item: 'Bread', quantity: 1, purchased: false },
  { item: 'Eggs', quantity: 12, purchased: false },
  { item: 'Cheese', quantity: 1, purchased: true },
  { item: 'Butter', quantity: 1, purchased: true },
  { item: 'Chicken', quantity: 1, purchased: false },
  { item: 'Tomatoes', quantity: 5, purchased: false },
  { item: 'Lettuce', quantity: 1, purchased: false }
];

for (let i = 0; i < shoppingList.length; i++) {
  if (!shoppingList[i].purchased) {
    console.log(`${shoppingList[i].quantity} ${shoppingList[i].item}`);
  }
}