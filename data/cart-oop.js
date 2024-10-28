// in am object we cant use export or let or const 
// "this" gives us the object that contains this function so it gives us the outer object in this case it gives us the cart object
// oop Tries to represent the real world and Easy to create multiple objects we just created a completely seperate cart by copying this object
//  function to create multiple objects
// Use PascalCase for things that generate objects

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined, // same as let cart = undefined and when we want to access this cart property we will use cart.cart it can be confusing so we will rename it
  
    loadFromStorage() { //function inside an object called Method. There is a shorthand property instead of loadFromStorage: function() we can just write loadFromStorage() {}
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));// we are loading from the same key in localStorage which is cart-oop every cart we generate it will get its data from same space from localStorage so we will replace it with a parameter //cart.cartItem to access the cartItems values
    
      if (!this.cartItems) {
        this.cartItems = [{ 
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }];
      }
    },
  
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems)); 
    },
  
    addToCart(productId) {
      let matchingItem;  
    
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1
        });
      }
    
      this.saveToStorage() //saveToStorage();
    },
  
    removeFromCart(productId) { 
      const newCart = [];
  
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId){ 
          newCart.push(cartItem)
        }    
      });
    
      this.cartItems = newCart; 
    
      this.saveToStorage();
    },
  
    updateDeliveryOption(productId, deliveryOptionId) { 
      
      let matchingItem;  
    
      this.cartItems.forEach((cartItem) => {              
        if (productId === cartItem.productId) { 
          matchingItem = cartItem; 
        }
      });
      
      matchingItem.deliveryOptionId = deliveryOptionId;
    
      this.saveToStorage();
    }
  };
  return cart; // so we can use it outside the function
}

const cart = Cart('cart-oop'); // Instead of copy pasting we will use a function to generate the objects
const businessCart = Cart('cart-business');

cart.loadFromStorage();


businessCart.loadFromStorage();



console.log(cart);
console.log(businessCart);
