
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
              src="images/ratings/rating-${product.rating.stars * 10}.png"> 
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
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

// last step is to take all this html and put it on the webpage using the DOM
// we are going to use the DOM to take this element <div class="products-grid"> put it in our JS and replace all the HTML inside

document.querySelector('.js-products-grid').innerHTML = productsHTML;


document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId; // dataset property gives us all the data attributes that are attached to the element
    
    let matchingItem;  

    cart.forEach((item) => {              //item will contain product name and quantity
      if (productId === item.productId) { 
        matchingItem = item; // if we found a matching item we will save it in matchingItem variable
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

    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity; //calculate the total quantity of all the items in the cart
    })

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity; //update the cart quantity in the header
  });
});