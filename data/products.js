import {formatCurrency} from '../scripts/utils/money.js';

export function getProduct(productId) {
  let matchingProduct; // variable to save the result of the search

    products.forEach((product) => { 
      if (product.id === productId) { // if the product id in the cart matches the product id in the products array
        matchingProduct = product // save the product in the matchingProduct variable
      }
    });

    return matchingProduct; // so we use this outside the function
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id; 
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  
  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`
  }

  // Only the clohing class have extraInfoHTML method if its just a regular product its not gonna have this method and cause an error
  extraInfoHTML() {
    return '';
  }
}

class Clothing extends Product { 
  sizeChartLink;

  constructor(productDetails) { 
    super(productDetails); // this will call the constructor of the parent class and pass the product
    this.sizeChartLink = productDetails.sizeChartLink;
  }
  
  extraInfoHTML() { // Generate some HTML that contain extra information about this product like size chart
    
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size chart
      </a>
    `;
  }
}


export let products = [];

export function loadProductsFetch() {
  const promise = fetch(
    'https://supersimplebackend.dev/products'
  ).then((response) => { 
    return response.json() 
  }).then((productsData) => { 
    products = productsData.map((productDetails) => { 
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
    console.log('load products');
  }).catch((error) => { 
    console.log('Unexpected error. Please try again later.');
  });
  return promise; 
}

export function loadProducts(func) { 
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => { 
    products = JSON.parse(xhr.response).map((productDetails) => { 
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
    console.log('load products');
    func();
  });
  
  
  xhr.addEventListener('error', (error) => { 
    console.log('Unexpected error. Please try again later.');
  })



  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}
