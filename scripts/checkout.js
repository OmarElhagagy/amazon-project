import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProducts, loadProductsFetch} from '../data/products.js';
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

// Promise.all 1.lets us run multiple promises at the same time 2. wait for all of them to finish
Promise.all([ // An array of promises and we will give this array to Promise.all() and it will wait for all the promises to finish before going to next step
  loadProductsFetch()
  /* instead of this fetch already returns a promise so we dont need to create a new promise
  new Promise((resolve) => { 
    loadProducts(() => { 
      resolve('value1'); 
    }); 
  })*/,
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => { // values we give to reslove will be saved here
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});

/*
new Promise((resolve) => { // This inner function gets a parameter called resolve its a function works similar to done() function. Lets us control when to go to the next step // promise is a built in class and when we create a prmise we need to give it a function. When we create this promise it will run this function immediately
  loadProducts(() => { // It will run this function after loadProducts is finished // we will give loadProducts a callback function like we did below 
    resolve('value1'); // Once it finished we want to go to the next step so we will call resolve
  }); // we will add a next step to a promise by adding a method called then

}).then((value) => { // We can give resolve a value like above so whatever we give to resolve is going to be saved in a parameter inside .then()
  //console.log('next step') // First we run this asynchronous code above then we wait for it to finish and then we run resolve and reslove makes it go to the next step
  console.log(value);
  return new Promise((resolve) => {
      loadCart(() => { // Once loadCart() is finished it runs this function and inside we will call resolve so that we move to next step
        resolve();
      });// we will add another next step
    });
  
  }).then(() => { // render the page
    renderOrderSummary();
    renderPaymentSummary();
  });
  //loadCart(); // We have a problem here we want for loadCart() to finish and then go the next step we usually do this using reslove but we dont have reslove inside this function to solve this problem inside .then() we will return a new promise
*/


/*
              Promise is same as callBack
              problem is multiple callbacks cause alot of nesting
loadProducts(() => { // This will save this function inside the parameter func and we will call func after we loaded all of the products
  loadCart(() => { // this function will run after the cart has loaded
    // lets say we want to wait for the products and cart to load before we render the page
    renderOrderSummary();
    renderPaymentSummary();
  });
}); // we will give loadProducts a callback
*/
