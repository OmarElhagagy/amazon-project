import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage, cart} from '../../data/cart.js';
// Integration tests
describe('test suite: renderOrderSummary', () => { // renderOrderSummary creates part of the page so when we are testing a page 2 things to test is 1. How the page looks 2. How the page behaves
  // Hooks lets us run some code for each test like in here before each test we made a bunch of setups so we can sahre this code between our tests
  // we have afterEach, beforeAll, afterAll, beforeEach
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => { // beforeEach Hook runs code before each test
    spyOn(localStorage, 'setItem'); // to not mess with localStorage we will mock it

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `; // all the HTML we created is placed inside the js-test-container
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{ 
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();
    renderOrderSummary(); // In the renderOrderSummary function for each product in the cart we created an element with the class cart-item-container since we have 2 products in the cart lets check that we created 2 of these elements on the page
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = ''; // to remove the HTML
  })

  // 1.Test How the page looks
  it('displays the cart', () => { //inside this container js-test-container we are creating an element with a class js-order-summary so to put sth inside this element we use innerHTML
    expect(
      document.querySelectorAll('.js-cart-item-container').length // we will check that we have 2 of these elements on the page
    ).toEqual(2) // we expect to have 2 of these elements on the page
  
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2') // toContain method checks if the value js-product-quantity-${productId1} contains the string Quantity: 2 it doesnt have to be exact match like toEqual

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1')
  });// what this html does is it takes this html and puts it inside the js-test-container and now we have the element we need for renderOrderSummary so when we call this function it will create the cart and display it inside this element // in our code orderSummary it takes the cart and then displays it but remember by default we load this cart from localStorage so we need to mock the localStorage.getItem method
  
  // 2. Test How the page behaves
  // lets make a test for delete button if it beahves correctly
  it('removes a product from the cart', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click(); // this will click delete on the firs product then remove it
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1); // we expect to have only 1 product in the cart after we remove the first product
    // check if the first product is no longer on the page
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null); // we expect that the first product is no longer on the page
    //check if the second product is still on the page
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null); // we expect that the second product is still on the page
    // check if the cart is updated 
    // the cart started with 2 products inside after removing the first product the cart should have a length of 1 and the remaining product should have productId2
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2); 
  })
}); 

  