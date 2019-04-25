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

  function renderMenu(menuArr) {
    console.log("This is menuarr: ",menuArr);
    menuArr.forEach( (menuObj) => {
      $('.menu-section-title').append(createMenuElement(menuObj))
    })
  }

$( function() {

  $.ajax({
    url: "/dishes",
    type: "GET",
    success: function(data) {
      console.log("this is data: ", data);
      renderMenu(data);
    }
  })
})




  // $(() => {
  //   $.ajax({
  //     method: "GET",
  //     url: "/api/users"
  //   }).done((foods) => {
  //     for(food of foods) {
  //     }
  //   });
    // .done( (bill) => {
    //   $("<div>").text(bill).appendTo($("body"));
    // })
  // });




})
