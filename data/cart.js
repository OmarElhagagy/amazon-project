// we are going to choose which variables we want ot be accessed outside this file using export
export let cart; // we are exporting the cart variable so we can access it outside this file

loadFromStorage(); // we are calling this function to load the cart from the local storage

export function loadFromStorage() { // in our test after we mock localStorage.getItem we will reload the cart using this function
  cart = JSON.parse(localStorage.getItem('cart')); // we need to get the cart from local storage and we need to parse it bec its a string

  if (!cart) { // if there is no cart in the local storage we will give it this default value
    cart = [{ 
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }
}

function saveToStorage() { // this function will save the cart to the local storage
  localStorage.setItem('cart', JSON.stringify(cart)); 
}


export function addToCart(productId) {
  let matchingItem;  

    cart.forEach((cartItem) => {              // item will contain product name and quantity
      if (productId === cartItem.productId) { // figure if a product is already in the cart
        matchingItem = cartItem; // if we found a matching item we will save it in matchingItem variable
      }
    });

    if (matchingItem) { // we can just type matchingItem here bec if we find a matching item it will be an object which is truthy value
      matchingItem.quantity += 1;
    } else {
      cart.push( {
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }

    saveToStorage(); // we are saving the cart to the local storage
                     // whenever we update the cart its saved in the local storage
}

export function removeFromCart(productId) { // this function will take productId and remove the product from the cart
  
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId){ // add each cartItem to the new array except if it has the productId
      newCart.push(cartItem);
    }  

  })

  cart = newCart; // we are reassigning the cart variable to the newCart array

  saveToStorage(); // we are saving the cart to the local storage
}

export function updateDeliveryOption(productId, deliveryOptionId) { // when we update the delivery option we need to know 1.product we want to update 2. delivery option we want to update 
  // we will loop through the cart and find the product we want to update 
  let matchingItem;  

  cart.forEach((cartItem) => {              
    if (productId === cartItem.productId) { 
      matchingItem = cartItem; 
    }
  });
  // update the deliveryOptionId of the product
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(func) { //Callback (a function to run in the future) // we will call it func which means it contains a function so we basically save the function renderProductsGrid in a parameter called func
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => { // It takes 2 param first is the event we want to listen for in this case the stringg load which means the response has loaded. Second param is the function we want to run after the response loads
    console.log(xhr.response);
    func();
  });
  

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}
