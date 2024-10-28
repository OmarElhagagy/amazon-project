import {formatCurrency} from '../../scripts/utils/money.js';
// testing mutiple situations is called test cases
// Testing framework is an external library that helps us write tests easier and helps us do all this things below automatically and gives us many features
console.log('test suite: formatCurrency()'); // A group of related tests is called a test suite

console.log('it converts cents into dollars');
console.log(formatCurrency(2095) === '20.95' ? 'passed' : 'failed');

console.log('it works with 0');
console.log(formatCurrency(0) === '0.00' ? 'passed' : 'failed');

console.log('it rounds to the nearest cent');
console.log(formatCurrency(2000.5) === '20.01' ? 'passed' : 'failed');
