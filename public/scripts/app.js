var cart = {};

$(document).ready(function () {

  //check to see if there is a previous cart
  if (localStorage.getItem('cart') !== null) {
    cart = JSON.parse(localStorage.getItem('cart'))

    //get the sum of all items
    let sum = 0;
    for (const item in cart) {
      sum += cart[item].quantity
    }
    $('#count').empty();
    $('#count').append(sum);
  }

  $( function() {

    $.ajax({
      url: "/dishes",
      type: "GET",
      success: function(data) {
        renderMenu(data);
      }
    })
    // console.log("This is local Storage: ", localStorage)
  })


  function createDishElement (menuData) {

    const dishName = menuData.name;
    const dishDesc = menuData.description;
    const dishPrice = menuData.price.toFixed(2);
    const $dishContainer = $('<div>').addClass("dish-container");


    const $createName = $('<div>').addClass('menu-item-name').text(dishName);
    const $createDesc = $('<div>').addClass('menu-item-description').text(dishDesc);
    const $createPrice = $('<div>').addClass('menu-item-price').text('$'+dishPrice);
    const $createButton = $('<button>').addClass('btn btn-outline-secondary').attr('onclick', `addToCart(${menuData.id},'${dishName}', '${dishDesc}', ${dishPrice})`).text('Add');


  const $dish = $('<div>').addClass('menu-item').append($createName)
                                                .append($createPrice)
                                                .append($createDesc)
                                                .append($createButton);

    $dishContainer.append($dish);

  return $dishContainer

  }

  function createDrinkElement (menuData) {

    const drinkName = menuData.name;
    const drinkPrice = menuData.price.toFixed(2);
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
    const dessertPrice = menuData.price.toFixed(2);

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



});

function addToCart(id, name, desc, price) {
  if (id in cart) {
    cart[id].quantity += 1;

  } else {
    cart[id] = {
      id: id,
      name: name,
      desc: desc,
      price: price,
      quantity: 1
    }
  }

  // console.log(cart)

  let sum = 0;
  for (const item in cart) {
      sum += cart[item].quantity
  }

  $('#count').empty();
  $('#count').append(sum);
}


function clearCart(){
  localStorage.setItem('cart', null);
  cart = {};
  window.location.reload();
}

//when the page is about to close
window.addEventListener('beforeunload', (event) => {
  console.log("setting before close");
  localStorage.setItem('cart', null);
  localStorage.setItem('cart', JSON.stringify(cart));
});
