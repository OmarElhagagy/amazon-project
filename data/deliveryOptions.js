export const deliveryOptions = [{
  id: '1', // we are going to save the id in the cart and use that id to get the full delivery option here
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) { // so this will take the deliveryOptionId and get the deliveryOption from the array 
    let deliveryOption; // variable to save the result of the search

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) { // if the delivery option id in the cart matches the delivery option id in the delivery options array
        deliveryOption = option // save the delivery option in the deliveryOption
    }
    });
    return deliveryOption || deliveryOptions[0]; // if the delivery option is not found, it will return the first delivery option
}
