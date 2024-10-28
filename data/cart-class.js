// class is an object generator in it we will put the properties and methods that we want for each object we generate from this class
// class help us generate these objects
// private property and methods are useful in bigger projects where people might be not sure which properties and methods are supposed to be used outside the class and which are supposed to be used inside the class
class Cart {
  cartItems; //public property // add a property to a class every object we generate will have this property 
  #localStorageKey; //private property this means it can be only used inside this class // this class has a property called localStorageKey this property is useful inside the class but its not meant to be used outside the class so we will make it private so it can be accessed inside the class but not outside the class

  constructor(localStorageKey) { // We need to FIX First is each object we create is going to run the constructor so we need one of each of these lines cart or businessCart Second is that the object we create is not going to be called cart every time so we need to replace cart with this so that it refers to the object we generate from the class AND we dont want localStorageKey to be cart-oop every time so we will replace it with a parameter
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
    
  }
  // Method loadFromStorage should also be used inside this class so we will make it private method
  #loadFromStorage() { //function inside an object called Method. There is a shorthand property instead of loadFromStorage: function() we can just write loadFromStorage() {}
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

// Each object we generate from a class ex: cart and business cart. Is called an instance of the class. We can also check if an object is an instance of a class by using instanceof keyword
// so the values inside here are saved in the parameters of the constructor so cart-oop will be saved inside localStorageKey
const cart = new Cart('cart-oop'); // we save a value for the localStorageKey parameter of constructor here // a class uses similar syntax as a function to generate an object from the class we use new keyword
const businessCart = new Cart('cart-business'); // to generate a new object from the class we use new keyword


/*
      Constructor lets us put this setup code inside the class and it works like a normal method we can put code inside and it will run the code but the Special thing about constructor is that when we generate an object  it will run the code inside the constructor automatically

cart.localStorageKey = 'cart-oop';
businessCart.localStorageKey = 'cart-business';

cart.loadFromStorage();
businessCart.loadFromStorage();
*/
console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart); // businessCart was generated from Cart class