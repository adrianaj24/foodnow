var cart = {};
$(document).ready(function () {

  function createDishElement (menuData) {

    const dishName = menuData.name;
    const dishDesc = menuData.description;
    const dishPrice = menuData.price;

    const $createName = $('<div>').addClass('menu-item-name').text(dishName);
    const $createDesc = $('<div>').addClass('menu-item-description').text(dishDesc);
    const $createPrice = $('<div>').addClass('menu-item-price').text('$'+dishPrice);
    const $createButton = $('<button>').addClass('btn btn-outline-secondary').attr('onclick', `addToCart(${menuData.id},'${dishName}', '${dishDesc}', ${dishPrice})`).text('Add');

  const $dish = $('<div>').addClass('menu-item').append($createName)
                                                .append($createPrice)
                                                .append($createDesc)
                                                .append($createButton);

  return $dish

  }

  function createDrinkElement (menuData) {

    const drinkName = menuData.name;
    const drinkPrice = menuData.price;
    const drinkDesc = menuData.description; 

    const $createName = $('<div>').addClass('menu-item-name').text(drinkName);
    const $createPrice = $('<div>').addClass('menu-item-price').text('$'+drinkPrice);
    const $createButton = $('<button>').addClass('btn btn-outline-secondary').attr('onclick', `addToCart(${menuData.id},'${drinkName}', '${drinkDesc}', ${drinkPrice})`).text('Add');

  const $dish = $('<div>').addClass('menu-item').append($createName)
                                                .append($createPrice)
                                                .append($createButton);

  return $dish

  }

  function createDessertElement (menuData) {

    const dessertName = menuData.name;
    const dessertDesc = menuData.description;
    const dessertPrice = menuData.price;

    const $createName = $('<div>').addClass('menu-item-name').text(dessertName);
    const $createDesc = $('<div>').addClass('menu-item-description').text(dessertDesc);
    const $createPrice = $('<div>').addClass('menu-item-price').text('$'+dessertPrice);
    const $createButton = $('<button>').addClass('btn btn-outline-secondary').attr('onclick', `addToCart(${menuData.id},'${dessertName}', '${dessertDesc}', ${dessertPrice})`).text('Add');

  const $dish = $('<div>').addClass('menu-item').append($createName)
                                                .append($createPrice)
                                                .append($createDesc)
                                                .append($createButton);

  return $dish

  }

  
  
  function renderMenu(menuArr) {
    menuArr.forEach( (menuObj) => {
      
      if (menuObj.type === 'main'){
        $('.menu-section-main').append(createDishElement(menuObj))
      } else if (menuObj.type === 'drink') {
        $('.menu-section-drinks').append(createDrinkElement(menuObj))
      } else if (menuObj.type === 'dessert') {
        $('.menu-section-dessert').append(createDessertElement(menuObj))
      }
    })
  }
  
  $( function() {
    
    $.ajax({
      url: "/dishes",
      type: "GET",
      success: function(data) {
        renderMenu(data);
      }
    })
  })
  
});

function addToCart(id, name, desc, price) {
  if (id in cart) {
    cart[id].quantity += 1;
  } else {
    cart[id] = {
      name: name,
      desc: desc,
      price: price,
      quantity: 1
    }
  }
  console.log(cart)
  $('#count').empty();
  var sum = 0; 
  for (const item in cart) {
    sum += cart[item].quantity 
  }
  $('#count').append(sum);

}



