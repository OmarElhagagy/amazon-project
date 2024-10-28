import {addToCart, cart, loadFromStorage} from '../../data/cart.js';
describe('test suite: addToCart', () => {
  it('adds an existing product to the cart', () => {
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
  
  it('adds a new product to the cart', () => { 
    spyOn(localStorage, 'setItem'); 
                                    
    spyOn(localStorage, 'getItem').and.callFake(() => { // we are spying on the getItem method of the localStorage object 
      return JSON.stringify([]); // local storage only supports strings
    }); 
    loadFromStorage(); 
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.length).toEqual(1) 
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1); 
  });
});
