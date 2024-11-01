class Cart {
  cartItems; 
  #localStorageKey; 

  constructor(localStorageKey) { 
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
    
  }
  // Method loadFromStorage should also be used inside this class so we will make it private method
  #loadFromStorage() { 
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));// we are loading from the same key in localStorage which is cart-oop every cart we generate it will get its data from same space from localStorage so we will replace it with a parameter //cart.cartItem to access the cartItems values
    
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
    };

    saveToStorage() {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems)); 
    };

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
    };

    removeFromCart(productId) { 
      const newCart = [];
  
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId){ 
          newCart.push(cartItem)
        }    
      });
    
      this.cartItems = newCart; 
    
      this.saveToStorage();
    };

    updateDeliveryOption(productId, deliveryOptionId) { 
      
      let matchingItem;  
    
      this.cartItems.forEach((cartItem) => {              
        if (productId === cartItem.productId) { 
          matchingItem = cartItem; 
        }
      });
      
      matchingItem.deliveryOptionId = deliveryOptionId;
    
      this.saveToStorage();
    };
}


const cart = new Cart('cart-oop'); 
const businessCart = new Cart('cart-business'); 



console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart); // businessCart was generated from Cart class
