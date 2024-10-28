import {formatCurrency} from '../../scripts/utils/money.js';
// describe function is provided by jasmin and it creates a test suite
// it is another function provided by jasmine and it creates a test case
describe('test suite: formatCurrency', () => {
  describe('Rounding', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  })

  it('rounds to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
})});