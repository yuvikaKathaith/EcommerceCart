// Cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Open cart
cartIcon.onclick = function(){
    cart.classList.add('active');
};
// Close cart
closeCart.onclick = function(){
    cart.classList.remove('active');
}

// Cart working JS
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}
else{
    ready();
}

//Making function
function ready(){
    //remove items from cart 
    var removeCartButtons = document.querySelectorAll('.cart-remove');
    console.log(removeCartButtons);
    for(var i=0; i<removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // Quantity changes
    var quantityInputs = document.querySelectorAll('.cart-quantity');
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //Add to cart
    var addCart = document.querySelectorAll('.add-cart');
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
    //Buy button work
    document.querySelector('.btn-buy').addEventListener('click', buyButtonClicked);
}
// Buy button 
function buyButtonClicked(){
    alert('Your order is placed');
    location.reload();    
}
//remove items from cart 
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}
//Quantity Changes
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}
// Add to cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.querySelector('.product-title').innerText;
    var price = shopProducts.querySelector('.price').innerText;
    var productImg = shopProducts.querySelector('.product-img').src;
    addProductToCart(title, price, productImg);
    updateTotal();
}
//add to cart
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    var cartItems = document.querySelector(".cart-content");
    var cartItemsNames = cartItems.querySelectorAll(".cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if(cartItemsNames[i].innerText == title){
            alert("You have already add this item to cart");
            return;
        }
    }
    var cartBoxContent = `
        <img src=${productImg} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- Remove Cart -->
        <i class='bx bxs-trash-alt cart-remove' ></i>
    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.querySelector('.cart-remove').addEventListener('click', removeCartItem);
    cartShopBox.querySelector('.cart-quantity').addEventListener('change', quantityChanged);
}

// update total
function updateTotal(){
    //find element with class cart-content and get the first one assuming theres only one
    var cartContent = document.querySelector('.cart-content');
    var cartBoxes = cartContent.querySelectorAll('.cart-box');
    //initialise with total = 0
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector('.cart-price');
        var quantityElement = cartBox.querySelector('.cart-quantity');
        // Get the price from the 'cart-price' element, remove the '$' sign, and convert it to a number
        var price = parseFloat(priceElement.innerText.replace('$', ""));
    
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    //if cart contains some cents value
    total = Math.round(total*100)/100 ;

    document.querySelector('.total-price').innerText = '$' + total;
}