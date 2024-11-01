import { cart } from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import {addOrder} from '../../data/orders.js';

export function renderPaymentSummary() {
  // this is for calculating the items chosen in the cart
  let productPriceCents = 0;  // a variable for adding them together
  let shippingPriceCents = 0;
  //1. save the data (MODEL)
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    // calculate the shipping cost
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents

  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  // 2. generate HTML (VIEW)
  // instead of using the same numbers each time we will use the variables we calculated above
  const paymentSummaryHTML = 
      `
        <div class="payment-summary-title">
                Order Summary
              </div>

              <div class="payment-summary-row">
                <div>Items (3):</div>
                <div class="payment-summary-money">
                  ${formatCurrency(productPriceCents)}
                </div>
              </div>

              <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">
                  $${formatCurrency(shippingPriceCents)}
                </div>
              </div>

              <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">
                  $${formatCurrency(totalBeforeTaxCents)}
                </div>
              </div>

              <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">
                  $${formatCurrency(taxCents)}
                </div>
              </div>

              <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">
                  $${formatCurrency(totalCents)}
                </div>
              </div>

              <button class="place-order-button button-primary
              js-place-order">
                Place your order
              </button>
      `;

      document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummaryHTML; // after we generate the HTML we tried to put the HTML in an element with class js-payment-summary and this element doesnt exist inour test so we need to add this element to our test 

      document.querySelector('.js-place-order')
        .addEventListener('click', async () => { // When we click this button it willl make request to the backend to create the order
          try{ // If we make a request and theres some sort of network error that error will go to catch block
            const response = await fetch('https://supersimplebackend.dev/orders', { // We need to send some data to the backend (we need to send our cart to the backend). To send a data in a request we need to sue a different type of request. 4 Common types of requests are GET, POST, PUT, DELETE. GET is used to get data from the backend. POST is used to send data to the backend. PUT is used to update data on the backend. DELETE is used to delete data on the backend. We will use POST request to send data to the server
              method: 'POST', // propert method and this is the type of the request
              headers: { // headers is an object and it lets us send additional information with the request. We will send the data in JSON format so we need to tell the server that we are sending JSON data
                'Content-Type': 'application/json' // This tells the backend what type of data we are sending in the request here we are sending JSON data
              },
              body: JSON.stringify({ // Actual data we will send to the backend
                cart: cart, // we cant send an object directly in our request we need to convert it to a JSON string
              })
            });
            const order = await response.json(); // To get the data thats attached to the response we need to use response.json() this returns a promise so we need to use await to wait for this promise to finish
            addOrder(order); // after we create an order from the backend we will add this order to the orders array and save it to local storage
          
          } catch (error) {
            console.log('Unexpected error. Please try again later.'); 
          }
          
          window.location.href = 'orders.html'; // After we create an order we will redirect the user to the orders page to do that we use window.location its a special object provided by JS and this controls the url of the page. We will set the href property to the url we want to go to
        });
}
