import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import {formatCurrency} from '../utils/money.js' 
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; 
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js'; 
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary() {
  let cartSummaryHTML = ''; // we will save the html in this variable

  cart.forEach((cartItem) => { 
    const productId = cartItem.productId; // we will get the product id from the cartItem and we will use it to search for the full product
    // this part takes a product id and finds the matching product
    
    const matchingProduct = getProduct(productId); // variable to save the result of the search
    const deliveryOptionId = cartItem.deliveryOptionId; // we will use this id to get the full delivery option
    //this below takes the deliveryOptionId and finds the full deliveryOption
    const deliveryOption = getDeliveryOption(deliveryOptionId); // variable to save the result of the search

   

    const today = dayjs(); // this code will take the delivery option we selected and calculate the delivery date we need to show
      const deliveryDate = today.add( 
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
      <div class="cart-item-container
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
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
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) { 
    let html = ''; // we will save the html in this variable

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs(); // to get todays date according to documentation
      const deliveryDate = today.add( 
        'days'
      );
      
      const dateString = deliveryDate.format('dddd, MMMM D');      
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
      // the matchingProduct variable isnt accessable in this function so we will pass it as a parameter and then when we call the function we will pass the matchingProduct
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : ''; 

        html +=`
              <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                  ${isChecked}
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}"> 
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} Shipping
                  </div>
                </div>
              </div>
        `
    })
    return html; 
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // we will add the event listener to the delete link
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId // we will get the product id from the data attribute
      removeFromCart(productId) // we will call the removeFromCart function and pass the product id
      // we will use the DOM to remove the product from the html
      const container = document.querySelector(`.js-cart-item-container-${productId}`); // we will use the product id to select the product and remove it
      container.remove(); // the DOM

      renderPaymentSummary(); // when we click delete we are going to update the data and then regenerate the html using this function
    })
  })

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        //update deliveryOptionId in the cart
        const {productId, deliveryOptionId} = element.dataset; // we will get the product id and delivery option id from the data
        updateDeliveryOption(productId, deliveryOptionId); // we will use the data attribute
        renderOrderSummary(); // instead of usong the DOM to update the html we will call the renderOrderSummary function to re run all the code
        renderPaymentSummary(); // when we click the delivery option we are going to update the data and then regenerate the html using this function (CONTROLLER)
      });
    })
}
