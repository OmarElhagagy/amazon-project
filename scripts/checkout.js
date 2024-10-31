import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProducts} from '../data/products.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
loadProducts(() => { // This will save this function inside the parameter func and we will call func after we loaded all of the products
  renderOrderSummary();
  renderPaymentSummary();
}); // we will give loadProducts a callback
