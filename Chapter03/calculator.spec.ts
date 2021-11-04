import { Calculator } from '../calculator';

describe('CalculatorTests', () => {
  it('두 숫자의 합', () => {
    const first = 10;
    const second = 20;
    const sut = new Calculator();

    const result = sut.sum(first, second);

    expect(result).toEqual(30);
  });
});
