/*
main idea of js:
1. save the data
2. generate HTML
3. make it interactive

// GET A VARIABLE OUT OF A FILE: 1. Add type="module" attribute 2. Export 3. Import

data = information (information about the products name, price, image, etc)
in our amazon.html we can see that the info about the products for rx the name and the image is inside the html 
so we need to take this data and save it inside our js file so our js can use it
*/
//this is called data structure
// 1- SAVE THE DATA

// to generate the html we can loop through this array and for each of this products we are going to create some html
// 2- GENERATE HTML
//we will combine all this html together

//in MODULES we have to 1.put all imports at the top of the file 2. we need to use live server

//import {cart as myCart} from '../data/cart.js'; // we are importing the cart array from the cart.js file
                                      // we nedd to get out of the scripts folder and into the data folder so to get out of the current folder the file is in we use ../
//const cart = [] // this will cause naming conflicts so we use cart as myCar

//benefits of modules is that we dont have to worry about order of our files in html file

// IMPORT HAS ANOTHER SYNTAX 
//import * as cartModule from '../data/cart.js'; // this will import everything from the cart.js file and save it in this object called cartModule
// access each import as a property like: cartModule.cart OR cartModule.addToCart('id)

import {cart, addToCart} from '../data/cart.js'; 
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
let productsHTML = ''; // every time we loop through the array we are going to add the html to this variable

products.forEach((product) => { // so the way forEach works is that it takes each object in the array and saves it in this parameter called product and then runs the function
  productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"> 
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
}); // this image has to exist if we generate it like this images/ratings/rating-${product.rating.stars}.png and in the images files its called rating-40 so we need to convert it so multiply it by 10
// we going to combine all of this html into one big string and then we are going to add it to the webpage
//console.log(productsHTML); // we combined all the html for all the products together
// last step is to take all this html and put it on the webpage using the DOM which is the document object model
// last step is to take all this html and put it on the webpage using the DOM
// we are going to use the DOM to take this element <div class="products-grid"> put it in our JS and replace all the HTML inside
//BENEFITS of generating HTML with JS is if i we want to add anothe product we just add it to the array and it will automatically generate the HTML for us

// we deleted the array we had here as we have an array in products.js file and amazon.js loops through the products and creates the HTML for each product
// our html has 2 js files one wit the products and one with the js code that generates the html
// 3- MAKE IT INTERACTIVE
// DATA ATTRIBUTE is another html attribute purpose of it is it allows us to attach any information to an html element

document.querySelector('.js-products-grid').innerHTML = productsHTML;

// we will take addToCart function and put it in the cart.js file BEST PRACTICE is to group related code together into its own file

function updateCartQuantity() { // we wont put this function in the cart.js file as it handles updating the webpage rather than managing the cart
  let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity; //calculate the total quantity of all the items in the cart
    })

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity; //update the cart quantity in the header
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId; // dataset property gives us all the data attributes that are attached to the element
    addToCart(productId); // so we will take value productId and put in the function and save it above in the function and then run the function                                             // it gets converted from kebab-case to camelCase
    updateCartQuantity();
  });
});