import {cart, removeFromCart, updateDeliveryOption} from '../data/cart.js'; // we will loop through the cart and generate the html // this is called Named Export
import { products } from '../data/products.js';
import {formatCurrency} from './utils/money.js' //./ means in the same directory
//import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'; // instead of using a local file we can use a url to import a module
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; // the dayjs exports one thing which is dayjs() so they chose to default // this different syntax called Default Export another way of exporting and we can use it when we only want to export 1 thing from a file amd it makes the syntax cleaner bec we dont write curly brackets
import {deliveryOptions} from '../data/deliveryOptions.js'; // we will use the delivery options to generate the html



const today = dayjs(); // external libraries often has documentation page shows us how to use the library
const deliveryDate = today.add(7, 'day'); // we are adding 7 days to the current date
const dateFormat = deliveryDate.format('dddd, MMMM D'); // we are formatting the date to be in the format we want
console.log(dateFormat)

function renderOrderSummary() {
  let cartSummaryHTML = ''; // we will save the html in this variable


  cart.forEach((cartItem) => { // this is the funcion we want to call above in deliveryOptionsHTML function
    const productId = cartItem.productId; // we will get the product id from the cartItem and we will use it to search for the full product

    let matchingProduct; // variable to save the result of the search

    products.forEach((product) => { //loop through products array
      if (product.id === productId) { // if the product id in the cart matches the product id in the products array
        matchingProduct = product // save the product in the matchingProduct variable
      }
    });

    
    // we are using the same code in checkout.js and amazon.js we can share this code between the two files by modules
    // we wont need / 100).toFixed(2) part as we made a function for it in another file
    // instead of using delivery-option-1 we will use delivery-option-${product.id} so that each product has its own delivery options

    const deliveryOptionId = cartItem.deliveryOptionId; // we will use this id to get the full delivery option

    let deliveryOption; // variable to save the result of the search

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) { // if the delivery option id in the cart matches the delivery option id in the delivery options array
        deliveryOption = option // save the delivery option in the deliveryOption
    }
    });

    const today = dayjs(); // this code will take the delivery option we selected and calculate the delivery date we need to show
      const deliveryDate = today.add( 
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
      <div class="cart-item-container
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
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) { // 3 steps: 1. loop through deliveryOptions 2. for each option generate some html 3. combine html together
    let html = ''; // we will save the html in this variable

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs(); // to get todays date according to documentation
      const deliveryDate = today.add( //first parameter is how many days we want to add and its saved in the deliveryOptions. second param is lenght of time we want to add
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM D');

      // if priceCents is 0 we want to display the text FREE if priceCents is not 0 we want to display the price as dollars with a dash -
      // we will do it using turnry operator 
      // first we will check if the price is 0 the way it works is that the first part returns true the value is whatever is after the question mark if the first part is false then the value is whatever after the colon
      // its like an if statement but we can store the result in a variable
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
      // the matchingProduct variable isnt accessable in this function so we will pass it as a parameter and then when we call the function we will pass the matchingProduct
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : ''; // we will check if the delivery option id in the cart matches the delivery option id in the delivery options array

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
    return html; // since we generated the html for the delivery options lets insert this into the html above
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // we will add the event listener to the delete link
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      //console.log('delete clicked') to make sure its working
      // when we click delete we want to do 2 steps 1. remove product from the cart 2. update the html

      const productId = link.dataset.productId // we will get the product id from the data attribute
      removeFromCart(productId) // we will call the removeFromCart function and pass the product id
      // we will use the DOM to remove the product from the html
      const container = document.querySelector(`.js-cart-item-container-${productId}`); // we will use the product id to select the product and remove it
      container.remove(); // the DOM
    })
  })

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        //update deliveryOptionId in the cart
        const {productId, deliveryOptionId} = element.dataset; // we will get the product id and delivery option id from the data
        //the code above is shorthand property its the same as const productId = element.dataset.productId; const deliveryOptionId = element.dataset.deliveryOptionId;
        updateDeliveryOption(productId, deliveryOptionId); // how do we get these 2 values we will use the data attribute
        renderOrderSummary(); // instead of usong the DOM to update the html we will call the renderOrderSummary function to re run all the code
        // inside the renderOrderSummary function we called the renderOrderSummary function again meaning it can call itself or re-run itself and this is called recursion its useful when a function needs to re-run its code
      });
    })
}
renderOrderSummary();