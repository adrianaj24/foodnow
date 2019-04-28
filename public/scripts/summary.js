
// Variable to be used on item's price sum
var total = 0;

// myObj represent the object containing the information for each item on the cart (local storage)
const myObj = JSON.parse(localStorage.getItem('cart'));


// Based on the items of the cart, this function receive each item and create the HTML element for it.
// Also make the sum of the price for each item rendered on the summary page
// Called by 'renderSummary' function
function summaryCart(storage) {

  const itemId = storage.id;
  const itemName = storage.name;
  const itemPrice = storage.price;
  const itemQty = storage.quantity;

  $item = `<a class="item1">${itemName}</a> <span class="itemId">${itemId}</span> <span class="quantity"></span> <span class="price">$${itemPrice}</span><div id="quatityButton">Quantity
                                <button type="button" id=${itemId} class="sub">-</button>
                                <input type="number" id="1" value=${itemQty} min="1" max="3" />
                                <button type="button" id=${itemId} class="add">+</button>
                                <button type="button" id=${itemId} class="delete">Delete</button>
                                </div>`

  total += itemPrice * itemQty;
  return $item
}


// Gets each item from the cart, call summaryCart, and then append the result of the page
function renderSummary (cart) {
  for (var item in cart) {
    $('.container').append(summaryCart(cart[item]))

  }
}


// Create the HTML element with the total price and append it on the page
function renderTotal(total) {
  $total = `<hr><p>Total $<span class="price1" style="color:black"><b>${total}</b></span></p>`
  $('.container1').append($total)

}


// Resets the localStorage to an empty object, eliminating all items on it
function clearCart(){
  localStorage.setItem('cart', null);
  cart = {};
  window.location.reload();
}


// Save the cart info when the user close the window
window.addEventListener('beforeunload', (event) => {
  localStorage.setItem('cart', null);
  localStorage.setItem('cart', JSON.stringify(cart));
});


// When clicking checkout, the function below do a several checks before proceeding
$( function() {
  const $button = $(".btn");

  $button.on('click', function (event) {
    event.preventDefault();

    if ( Object.keys(JSON.parse(localStorage.getItem('cart'))).length == 0 ) {
      $('.error').slideDown('slow');
        $('.error').text("You need to choose before placing an order")

    } else if ( !$('#fname').val() || !$('#fname').val() || !$('#pnumber').val() || !$('#pnumber').val() ) {
      $('.error').slideDown('slow');
        $('.error').text("Please fill out the form correctly")

    } else if ( $('#pnumber').val().length !== 10 ) {
      $('.error').slideDown('slow');
        $('.error').text("The phone number must have 10 digits")

    } else {
      var data = $('#submitForm').serialize()
      // console.log(data);
      $('.error').slideUp('fast');
      $.ajax({
        url: '/checkout',
        type: "POST",
        data: data,
        success: function () {
          console.log("something", data)
        window.location = "/checkout"
        }
      })
    }
  })
})

$(document).ready(function () {

  // Load the cart from local storage
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


  // Delete function to remove items from the cart
  $('.delete').on('click', function (event) {
    cart = JSON.parse(localStorage.getItem('cart'));
    delete cart[this.id];
    window.location.reload();
  });


  // Add function to increase quantity of specific item
  // Also changes the total amount
  $('.add').on('click',function (event) {
    localStorage.getItem('cart');
    cart = JSON.parse(localStorage.getItem('cart'));
    cart[this.id].quantity += 1
    localStorage.setItem("cart", JSON.stringify(cart));
    // renderTotal(total.toFixed(2));
    console.log("Toal before: ",total);
    total = total + cart[this.id].price;
    $('.price1').text(total.toFixed(2));
    console.log("Total after: ",total)
    if ($(this).prev().val() < 100) {
      $(this).prev().val(+$(this).prev().val() + 1);
    }
  });

  // Subtraction function to decrease quantity of specific item
  // Stops at quantity = 1
  // Also changes the total amount
  $('.sub').click(function () {
    if ($(this).next().val() > 1) {
      localStorage.getItem('cart');
      cart = JSON.parse(localStorage.getItem('cart'));
      cart[this.id].quantity -= 1
      localStorage.setItem("cart", JSON.stringify(cart));
      // renderTotal(total.toFixed(2));
      console.log("Toal before: ", total);
      total = total - cart[this.id].price;
      $('.price1').text(total.toFixed(2));
      console.log("Total after: ", total)

      if ($(this).next().val() > 1) {
        $(this).next().val(+$(this).next().val() - 1);
      }
    }
  });
});
