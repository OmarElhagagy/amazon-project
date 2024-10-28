import {addToCart, cart, loadFromStorage} from '../../data/cart.js';
// the function addToCart uses an if statement Best practice is to test each condition of an if statement
// this is known as Test coverage= how much of the code is being tested(try to maximize test coverage)
// for the firs if statement we will test when the product is already in the cart and for else when the product is not in the cart
describe('test suite: addToCart', () => {
  it('adds an existing product to the cart', () => {
    // first we want to setup the cart so it already contains the product we want to add to do that we will mock the localStorage.getItem method of the localStorage object
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }])
    });
    loadFromStorage(); // we are reloading the cart so it will be empty
    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); 
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });
  // the order is important we want to mock localStorage.setItem first and then we call addToCart and then it will no longer save to localStorage
  // spyOn records every time a method is used. For Example What if we wanted to make sure that addToCart saves the cart to local storage in our test setItem is mocked so we cant really check whats inside localStorage
  // Instead we can check if addToCart called setItem at some point
  it('adds a new product to the cart', () => { // unlike formatCurrency function addToCart function does not return a value so we cant compare it to another value using expect instead we will call addToCart to modify the cart and then check if this cart looks correct
    spyOn(localStorage, 'setItem'); // at the bottom of our cart.js we are saving the cart to local storage so this is going to call localStorage.setItem we dont actually want to save to localStorage as this is just test code so we will mock localStorage.setItem
                                    // spyOn takes two arguments the object and the method we want to mock
    spyOn(localStorage, 'getItem').and.callFake(() => { // we are spying on the getItem method of the localStorage object and we are replacing it with a fake function so it starts empty as in in the original function it doesnt start empty
      return JSON.stringify([]); // local storage only supports strings
    }); // our test is still failing as we import the cart at the top so the order of the code matters fist we load the cart from local storage and after we are mocking localStorage.getItem so the cart is already loaded and the code doesnt have the effect
        // to solve it after mocking localStorage we should reload the cart
    //console.log(localStorage.getItem('cart')) // we mocked the getItem method so it will return an empty array
    loadFromStorage(); // this time we mock the localStorage.getItem first to return an empty array then when we reload the cart it will be empty
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6') // this function takes one string which is the productId which we will choose froom products.js file
    expect(cart.length).toEqual(1) // lets check if cart.length is correct so if we assume that the cart is empty and we add a product to it the length of the cart should be 1 
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // This method checks how many times localStorage.setItem has been called in the code above
    // After w mock a method we can check how many times it has been called and what values this method received
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1); 
  });
});