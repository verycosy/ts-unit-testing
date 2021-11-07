import { Product } from './price-engine.spec';

describe('OrderTests', () => {
  // 상태 기반 테스트
  it('주문에 제품 추가', () => {
    const product = new Product('Hand wash');
    const sut = new Order();

    sut.addProduct(product);

    expect(sut.products.length).toEqual(1);
    expect(product).toEqual(sut.products[0]);
  });
});

class Order {
  private readonly _products: Product[] = [];

  get products() {
    return this._products;
  }

  public addProduct(product: Product): void {
    this._products.push(product);
  }
}
