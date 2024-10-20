import {cart, removeFromCart} from '../data/cart.js'; // we will loop through the cart and generate the html
import { products } from '../data/products.js';
import {formatCurrency} from './utils/money.js' 

let cartSummaryHTML = ''; // save the html in this variable

cart.forEach((cartItem) => {
  const productId = cartItem.productId; // get the product id from the cartItem and we will use it to search for the full product

  let matchingProduct; // variable to save the result of the search

  products.forEach((product) => { //loop through products array
    if (product.id === productId) { // if the product id in the cart matches the product id in the products array
      matchingProduct = product // save the product in the matchingProduct variable
    }
  });

  
  cartSummaryHTML += `
    <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
})

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

// we will add the event listener to the delete link
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
   
    // when we click delete we want to do 2 steps 1. remove product from the cart 2. update the html

    const productId = link.dataset.productId // we will get the product id from the data attribute
    removeFromCart(productId) // we will call the removeFromCart function and pass the product id
    // we will use the DOM to remove the product from the html
    const container = document.querySelector(`.js-cart-item-container-${productId}`); // we will use the product id to select the product and remove it
    container.remove();
  })
})
