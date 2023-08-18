//slider
// var images = [
//     "img/slider/slider_01.jpg",
//     "img/slider/slider_02.jpg",
//     "img/slider/slider_03.jpg",
//     "img/slider/slider_04.png"
//   ];

// var currentImage = 0;

// function changeImage() {
//   currentImage++;
//   if (currentImage >= images.length) {
//     currentImage = 0;
//   }
//   document.getElementById("slider").style.backgroundImage = "url(" + images[currentImage] + ")";
// }

// setInterval(changeImage, 5000);

//search product


if(document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else{
  ready();
}

function ready() {
  // remove product
  var removeCartButtons = document.querySelectorAll('.cart-remove');
  for(var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //quantity change
  var quantityInputs = document.getElementsByClassName('cart-quantity');
  for(var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // add to cart
  var addCart = document.getElementsByClassName('pro-cart');
  for(var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
}

// add to cart
function addCartClicked(event) {
  var button = event.target
  var shopProducts = button.parentElement
  var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  var price = shopProducts.getElementsByClassName('product-price')[0].innerText;
  var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
  // console.log(title, price, productImg);
  addProductToCart(title, price, productImg);
  updateCartTotal();
}

// function addProductToCart(productImg, productTitle, productPrice) {
//   const cartRow = document.createElement('tr');
//   cartRow.innerHTML = `
//     <td><i class="ri-close-circle-line"></i></td>
//     <td><img src="${productImg}" alt=""></td>
//     <td>${productTitle}</td>
//     <td>${productPrice}</td>
//     <td><input type="number" value="1"></td>
//   `;
//   const cartTable = document.querySelector('tbody');
//   cartTable.appendChild(cartRow);
// }

// addProductToCart
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("tr");
  cartShopBox.classList.add('tbody')
  console.log(cartShopBox);
  var cartItems = document.getElementsByTagName("tbody")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-title");
  var cartQuantities = cartItems.getElementsByClassName("cart-quantity");
    for (var i = 0; i < cartItemsNames.length; i++) {
      if (cartItemsNames[i].innerText == title) {
        // item tồn tại trong card rồi nên tăng 
        var quantityInput = cartQuantities[i];
        var newQuantity = parseInt(quantityInput.value) + 1;
        quantityInput.value = newQuantity;
        return; 
      }
    }
  //chưa tồn tại thì add thêm cái mới
  var cartBoxContent = `<td><i class="ri-close-circle-line cart-remove"></i></td>
                        <td class="cart-img"><img src="img/products/f1.jpg" alt=""></td>
                        <td class="cart-title">Cartoon Astronaut T-shirts</td>
                        <td class="cart-price">500000 VNĐ</td>
                        <td><input type="number" value="1" class="cart-quantity"></td>`;
      cartShopBox.innerHTML = cartBoxContent;
      cartItems.appendChild(cartShopBox);
      cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
      cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}

// Lấy nút "Thêm vào giỏ hàng"
// const addToCartButtons = document.querySelectorAll('.pro-cart');

// Lặp qua từng nút để gắn sự kiện click
// addToCartButtons.forEach(function(button) {
//   button.addEventListener('click', addToCartClicked);
// });

// function addToCartClicked(event) {
//   const button = event.target;
//   const product = button.parentElement;

  // Lấy thông tin sản phẩm
  // const productImg = product.querySelector('.product-img').src;
  // const productTitle = product.querySelector('.product-title').innerText;
  // const productPrice = product.querySelector('.product-price').innerText;

  // Thêm sản phẩm vào giỏ hàng
  // addProductToCart(productImg, productTitle, productPrice);

  // Cập nhật giỏ hàng
  // updateCartTotal();
// }

// function addProductToCart(productImg, productTitle, productPrice) {
//   const cartRow = document.createElement('tr');
//   cartRow.innerHTML = `
//     <td><i class="ri-close-circle-line"></i></td>
//     <td><img src="${productImg}" alt=""></td>
//     <td>${productTitle}</td>
//     <td>${productPrice}</td>
//     <td><input type="number" value="1"></td>
//   `;
//   const cartTable = document.querySelector('tbody');
//   cartTable.appendChild(cartRow);
// }



// removeCartItem
function removeCartItem(event) {
  var buttonClicked = event.target.parentElement.parentElement;
  buttonClicked.remove();
  updateCartTotal();
}

// quantityChanged
function quantityChanged(event) {
  var input = event.target
  if(isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal();
}

// update CartTotal 
function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-content')[0];
  var cartRows = cartItemContainer.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByTagName('td')[3];
    var quantityElement = cartRow.getElementsByTagName('td')[4].getElementsByTagName('input')[0];
    var price = parseFloat(priceElement.innerText.replace('VNĐ',''));
    var quantity = quantityElement.value;
    total += price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('total-price')[0].innerText = total + ' VNĐ';
}


