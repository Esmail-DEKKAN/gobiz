var cart = [];
var whatsAppNumber = "919159345508";
var whatsAppMessage = "Thanks for shopping with us. Pre Payment Required";
var currency = "$";
console.log(cart);
$("#badge").hide();
$("#place-order").hide();
$("#empty-cart").show();

function addToCart(pid) {
  "use strict";
  var productName = $("#" + pid + "_product_name").text();
  var price = $("#" + pid + "_price").text();
  var product_image = $("#" + pid + "_product_image").attr("src");
  var subtitle = $("#" + pid + "_subtitle").text();

  var quantity_increment = false;
  for (let index = 0; index < cart.length; index++) {
    if (cart[index].product_id == pid) {
      cart[index].qty = cart[index].qty + 1;
      quantity_increment = true;
      successAlert("Cart updated");
      updateBadge();
    }
  }
  if (quantity_increment == false) {
    cart.push({
      product_name: productName,
      price: price,
      product_id: pid,
      currency: currency,
      qty: 1,
      product_image: product_image,
      subtitle: subtitle,
    });
    successAlert("Item added to cart");
    updateBadge();
  }
  updateList();
}

function updateList() {
  "use strict";
  var cart_items = "";
  var grandTotal = 0;
  for (let j = 0; j < cart.length; j++) {
    var total_price = 0;
    total_price = cart[j].qty * Number(cart[j].price);
    grandTotal += Number(total_price);
    cart_items +=
      '<div class="p-4 bg-white rounded"><img class="rounded bp-2" src="images/115462851703180043069-61540d063bfbe.png"><div class="flex mb-6 mt-1 justify-between items-center"><div><h3 class="text-sm font-medium">' +
      cart[j].product_name +
      '</h3> <span class="text-xs text-gray-500">' +
      cart[j].subtitle +
      '</span></div></div><div class="flex mb-2 justify-between items-center"><h4 class="text-xl font-bold">' +
      currency +
      " " +
      total_price +
      '</h4> <a onclick="reduceQty(' +
      j +
      ')" class="py-2 px-3 bg-red-500 hover:bg-red-600 rounded-full text-xs text-white transition duration-200">-</a><h4 class="text-sm font-medium">' +
      cart[j].qty +
      '</h4> <a onclick="addQty(' +
      j +
      ')" class="py-2 px-3 bg-red-500 hover:bg-red-600 rounded-full text-xs text-white transition duration-200">+</a> <a class="py-2 px-3 bg-red-500 hover:bg-red-600 rounded-full text-xs text-white transition duration-200" onclick="removeFromCart(' +
      j +
      ')">X</a></div></div>';
  }
  cart_items +=
    '<br> <h3 class="pl-4 pt-4 pr-4 font-bold">Grand total: ' +
    currency +
    " " +
    grandTotal.toFixed(2) +
    "</h3>";
  $("#cart_items").html(cart_items);
}

function updateBadge() {
  "use strict";
  var badgeCount = cart.length;
  if (badgeCount > 0) {
    $("#empty-cart").hide();
    $("#badge").text(badgeCount);
    $("#badge").show();
    $("#place-order").show();
  } else {
    $("#badge").hide();
    $("#place-order").hide();
    $("#empty-cart").show();
  }
}
