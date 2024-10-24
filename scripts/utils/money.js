// we will create a function that does the same thing as this code $${(matchingProduct.price / 100).toFixed(2)} and we can share this function between the two files
// we will name the file utils as this code is $${(matchingProduct.price / 100).toFixed(2)} a useful utility that we want to share 
// this file will contain utilities that are related to money

export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

export default formatCurrency;  // when we import that we import it with the name without the curly brackets
// each file can only have one default export
