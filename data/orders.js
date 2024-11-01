export const orders = JSON.parse(localStorage.getItem('orders')) || []; // load the orders from storage

export function addOrder(order) { // we will give it order object and add it to the array // function for adding an order in this array
  orders.unshift(order) // for orders we want the most recent order at the top so we will add this order to the front of the array so we will type the name of the array and use the method .unshift() method
  saveToStorage();
}

function saveToStorage() { // function to save to local storage
  localStorage.setItem('orders', JSON.stringify(orders)); 
}