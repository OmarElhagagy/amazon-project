import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProducts, loadProductsFetch} from '../data/products.js';
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

/* async makes a function return a promise its a shortcut for
function loadPage() {
  return new Promise((resolve) => {
    resolve();
  });
}

If we write return 'value2' its same as
function loadPage() {
  return new Promise((resolve) => {
    resolve('value2');
  });
}
*/ 

// Error handling in async await we  use try catch method. We could use try catch method with synchronous code(normal code) but its more useful with asynchronous code
// Why we dont use try catch method every where bec its meant to handle unexpected errors.(code is correct but sth outode our control caused an error) If we know an error might happen we should use if else statement
// We use async bec it lets us use await. await lets us wait for promise to finish before going to next line
async function loadPage() { // async makes a function return a promsie  // as this returns a promise we can add a next step
  try{ // we will put the code that might throw an error inside try block
    // we can manually create errors using throw. throw ceates a new error or throws an error that we will catch later. We can give this a value any value like stringor number or object
    //throw 'error1'; // This will manually create an error when we get an error it will skip the rest of the code and go to catch block
    
    await loadProductsFetch() // async await can only be used with promises // We can only use await when we are inside async function // loads products from the backend. This returns a promise so one way to wait for this to finish is to use .then() and give it a function. Instead we use await to wait for this promise to finish
    // we loaded the products and waited for it to finish then we load the cart
    const value = await new Promise((resolve, reject) => {// In promises there are 2 ways to manually create an error // we can use await with Promise.all()
      //throw 'error2'; // It will get an error and will not load the cart and will go to catch block and display the error message
      loadCart(() => { // In here we load the cart and once it finishes loading we will run this function So this function runs in the future. Instead Promises gives us another way to create an error when we create a new promise it gives us a second parameter called reject. reject is a function and lets us create an error in the future
        //reject('error3');
        resolve('value3'); 
      }); 
    });//.then((value) => {}); value1 will be saved in value parameter. But when we use await this value1 is returned from the promise so we can save it in a variable
  
  } catch (error) { // If any of the code inside try block throws an error we can catch it here
    console.log('Unexpected error. Please try again later.');
  }
  

  renderOrderSummary();
  renderPaymentSummary(); 
}
loadPage()


// Currently we are using promises to handle asynchronous code but problem with promises it creates alot of code. Async await is a shortcut for promises
// Promise.all 1.lets us run multiple promises at the same time 2. wait for all of them to finish
/*
Promise.all([ // An array of promises and we will give this array to Promise.all() and it will wait for all the promises to finish before going to next step
  loadProductsFetch()
   instead of this fetch already returns a promise so we dont need to create a new promise
  new Promise((resolve) => { 
    loadProducts(() => { 
      resolve('value1'); 
    }); 
  }),
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
*/

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
