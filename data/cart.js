// we are going to choose which variables we want ot be accessed outside this file using export
export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) { // if there is no cart in the local storage we will create an empty cart
  cart = [{ 
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }];
}

function saveToStorage() { // this function will save the cart to the local storage
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId) {
  let matchingItem;  

    cart.forEach((cartItem) => {              //item will contain product name and quantity
      if (productId === cartItem.productId) { //how to figure if a product is already in the cart
        matchingItem = cartItem; // if we found a matching item we will save it in matchingItem variable
      }
    });

    if (matchingItem) { // we can just type matchingItem here bec if we find a matching item it will be an object which is truthy value
      matchingItem.quantity += 1;
    } else {
      cart.push( {
        productId: productId,
        quantity: 1
      });
    }
}

export function removeFromCart(productId) { // this function will take productId and remove the product from the cart
  //steps 1.create a new array 2. loop through the array 3. add each product to the new array except this productId
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId){ // add each cartItem to the new array except if it has the productId
      newCart.push(cartItem);
    }  

  })

  cart = newCart; // we are reassigning the cart variable to the newCart array

  saveToStorage(); // we are saving the cart to the local storage
}