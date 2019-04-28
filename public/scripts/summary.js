

var total = 0;

  const myObj = JSON.parse(localStorage.getItem('cart'));

  function summaryCart(storage) {

    const itemId = storage.id;
    const itemName = storage.name;
    const itemPrice = storage.price;
    const itemQty = storage.quantity;

    $item = `<a class="item1">${itemName}</a> <span class="itemId">${itemId}</span> <span class="quantity"></span> <span class="price">$${itemPrice}</span><div id="quatityButton">Quantity
                                  <button type="button" id=${itemId} class="sub">-</button>
                                  <input type="number" id="1" value=${itemQty} min="1" max="3" />
                                  <button type="button" id=${itemId} class="add">+</button>
                                  </div>`

    total += itemPrice * itemQty;
    return $item
  }


function renderSummary (cart) {
  for (var item in cart) {
    $('.container').append(summaryCart(cart[item]))

  }
}

function renderTotal(total) {
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

      if ( $('#fname').val() === "" || $('#fname').val() === null || $('#pnumber').val() === "" || $('#pnumber').val() === null) {
        $('.error').slideDown('slow');
          $('.error').text("Please fill out the form")
          console.log("I am inside the first function")
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
  $('.sub').click(function () {
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
  });
  renderTotal(total.toFixed(2));
  });
