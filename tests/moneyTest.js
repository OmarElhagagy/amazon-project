import {formatCurrency} from '../scripts/utils/money.js';

console.log('test suite: formatCurrency()'); 

console.log('it converts cents into dollars');
console.log(formatCurrency(2095) === '20.95' ? 'passed' : 'failed');

console.log('it works with 0');
console.log(formatCurrency(0) === '0.00' ? 'passed' : 'failed');

console.log('it rounds to the nearest cent');
console.log(formatCurrency(2000.5) === '20.01' ? 'passed' : 'failed');
