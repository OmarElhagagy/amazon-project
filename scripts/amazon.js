/*
main idea of js:
1. save the data
2. generate HTML
3. make it interactive

data = information (information about the products name, price, image, etc)
in our amazon.html we can see that the info about the products for rx the name and the image is inside the html 
so we need to take this data and save it inside our js file so our js can use it
*/
//this is called data structure
// 1- SAVE THE DATA
/*
const products = [{
  image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
  name:  'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating: {
    stars: 4.5,
    count: 87
  },
  priceCents: 1090 // js has a problem with doing math with floats so best practice when calculating money is to calculate in cents
}, {
  image: 'images/products/intermediate-composite-basketball.jpg',
  name: 'Intermediate Size Basketball',
  rating: {
    stars: 4.0,
    count: 127
  },
  priceCents: 2095
}, {
  image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name: 'Adults Plain Cotton T-Shirt - 2 Pack',
  rating: {
    stars: 4.5,
    count: 56 
  },
  priceCents: 799 
}, {
  image: 'images/products/black-2-slot-toaster.jpg',
  name: '2 Slot Toaster - Black',
  rating: {
    stars: 5.0,
    count: 2197
  },
  priceCents: 1899
}];
*/
// to generate the html we can loop through this array and for each of this products we are going to create some html
// 2- GENERATE HTML
//we will combine all this html together

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

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>
  `;
}); // this image has to exist if we generate it like this images/ratings/rating-${product.rating.stars}.png and in the images files its called rating-40 so we need to convert it so multiply it by 10
// we going to combine all of this html into one big string and then we are going to add it to the webpage
console.log(productsHTML); // we combined all the html for all the products together
// last step is to take all this html and put it on the webpage using the DOM which is the document object model
// we are going to use the DOM to take this element <div class="products-grid"> put it in our JS and replace all the HTML inside
//BENEFITS of generating HTML with JS is if i we want to add anothe product we just add it to the array and it will automatically generate the HTML for us
document.querySelector('.js-products-grid').innerHTML = productsHTML;
// we deleted the array we had here as we have an array in products.js file and amazon.js loops through the products and creates the HTML for each product
// our html has 2 js files one wit the products and one with the js code that generates the html