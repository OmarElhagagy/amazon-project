import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage, cart} from '../../data/cart.js';
import {loadProducts, loadProductsFetch} from '../../data/products.js';
// Integration tests
describe('test suite: renderOrderSummary', () => { 
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll((done) => { // done is a functon provided by jasmin when we add this done parameter beforeAll will not automatically proceed next step // beforeAll hook it will run a function before all our tests
    loadProductsFetch().then(() => { //This returns a promise and we can attach more steps to a promise
      done();
    });
  });
    

  beforeEach(() => { 
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
    renderOrderSummary();
  }); // <-- Closing bracket for beforeEach

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = ''; // to remove the HTML
  });

  // 1. Test How the page looks
  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length 
    ).toEqual(2); // we expect to have 2 of these elements on the page
  
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2'); 
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
  });
  
  // 2. Test How the page behaves
  it('removes a product from the cart', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click(); // this will click delete on the first product then remove it
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1); // we expect to have only 1 product in the cart after we remove the first product
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null); // we expect that the first product is no longer on the page
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null); // we expect that the second product is still on the page

    // check if the cart is updated 
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2); 
  });
})
