$(document).ready(function() {

  function createMenuElement (menuData) {

    const dishName = menuData.name;
    const dishDesc = menuData.description;
    const dishPrice = menuData.price;

    const $createName = $('<div>').addClass('menu-item-name').text(dishName);
    const $createDesc = $('<div>').addClass('menu-item-description').text(dishDesc);
    const $createPrice = $('<div>').addClass('menu-item-price').text(dishPrice);

  const $dish = $('<div>').addClass('menu-item').append($createName)
                                                .append($createDesc)
                                                .append($createPrice);

  return $dish

  }


  $(() => {
    $.ajax({
      method: "GET",
      url: "/"
    }).done((foods) => {
      for(food of foods) {
        $('.menu-section-title').append(createMenuElement(food));
      }
    });
    // .done( (bill) => {
    //   $("<div>").text(bill).appendTo($("body"));
    // })
  });




})
