import {cart, addToCart} from '../data/cart.js'; 
import {products, loadProducts} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

// The homepage is empty so whats wrong? HTTP requests are asynchronous loadProducts will send a request to my backend but it takes time for the request to travel across the internet to the backend and travel back so hete it will send the request and the response hasnt been loaded yet so the products array is empty soo we need the HTTP request to finish first and for the response to come back then we will run the rest of the code. So we will 1.put all this code in a function and 2. Give this function to loadProducts
loadProducts(renderProductsGrid); // we will put the renderProductsGrid function inside loadProducts usning a parameter so remember in JS are values and we can use a function as a parameter so inside loadProducts in products.js so the function renderProductsGrid will be saved in a parameter of loadProducts in products.js 

function renderProductsGrid() {
  let productsHTML = ''; // every time we loop through the array we are going to add the html to this variable

  products.forEach((product) => { 
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
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
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

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  }); 
  // last step is to take all this html and put it on the webpage using the DOM

  // we deleted the array we had here as we have an array in products.js file and amazon.js loops through the products and creates the HTML for each product

  document.querySelector('.js-products-grid').innerHTML = productsHTML;


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
      const productId = button.dataset.productId; // all the data attributes that are attached to the element
      addToCart(productId); // so we will take value productId and put in the function and save it above in the function and then run the function                                             // it gets converted from kebab-case to camelCase
      updateCartQuantity();
    });
  });
}
