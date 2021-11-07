describe('PriceEngineTests', () => {
  // 출력 기반 테스트
  it('두 상품 할인', () => {
    const product1 = new Product('Hand wash');
    const product2 = new Product('Shampoo');
    const sut = new PriceEngine();

    const discount = sut.calculateDiscount([product1, product2]);

    expect(discount).toEqual(0.02);
  });
});

class PriceEngine {
  public calculateDiscount(products: Product[]): number {
    const discount = products.length * 0.01;
    return Math.min(discount, 0.2);
  }
}

export class Product {
  constructor(public name: string) {}
}
