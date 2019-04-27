

var total = 0;
  const myObj = JSON.parse(localStorage.getItem('cart'));
  function summaryCart(storage) {

    const itemName = storage.name;
    const itemPrice = storage.price;
    const itemQty = storage.quantity;

    // console.log("item name", itemName)
    // console.log("item price", itemPrice)
    // console.log("item Qty", itemQty)

    $item = `<a class="item1">${itemName}</a> <span class="quantity">${itemQty}</span> <span class="price">$${itemPrice}</span>`
    total += itemPrice * itemQty;
    // console.log("Total is: ",total);
    return $item
  }


function renderSummary (cart) {
  for (var item in cart) {
    $('.container').append(summaryCart(cart[item]))

  }
}

function renderTotal (total) {
  $total = `<hr><p>Total <span class="price1" style="color:black"><b>$${total}</b></span></p>`
  $('.container1').append($total)

}

function clearCart(){
  localStorage.setItem('cart', null);
  cart = {};
  window.location.reload();
}
//when the page is about to close
window.addEventListener('beforeunload', (event) => {
  // console.log("setting before close");
  localStorage.setItem('cart', null);
  localStorage.setItem('cart', JSON.stringify(cart));
});

$( function() {
    const $button = $(".btn");

    $button.on('click', function (event) {
      event.preventDefault();
    // console.log("this is fname val",$('#fname').val() )

      if ( $('#fname').val() === "" || $('#fname').val() === null || $('#pnumber').val() === "" || $('#pnumber').val() === null) {
        $('.error').slideDown('slow');
          $('.error').text("Please fill out the form")
          console.log("I am inside the first function")
      } else {
        $('.error').slideUp('fast');
        $.ajax({
          url: '/checkout',
          type: "get"
        })
      }

    })
  })

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

  renderSummary(myObj);
  renderTotal(total.toFixed(2));
});
