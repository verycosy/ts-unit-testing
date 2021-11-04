import { Customer, Product, Store } from '../store';

describe('CustomerTests', () => {
  it('인벤토리가 충분하면 구매 성공', () => {
    // 준비(given)
    const store = createStoreWithInventory(Product.Shampoo, 10);
    const sut = createCustomer();

    // 실행(when)
    const success = sut.purchase(store, Product.Shampoo, 5);

    // 검증(then)
    expect(success).toBe(true);
    expect(store.getInventory(Product.Shampoo)).toEqual(5);
  });

  it('인벤토리가 부족하면 구매 실패', () => {
    const store = createStoreWithInventory(Product.Shampoo, 10);
    const sut = createCustomer();

    const success = sut.purchase(store, Product.Shampoo, 15);

    expect(success).toBe(false);
    expect(store.getInventory(Product.Shampoo)).toEqual(10);
  });

  function createStoreWithInventory(product: Product, quantity: number): Store {
    const store = new Store();
    store.addInventory(product, quantity);
    return store;
  }

  function createCustomer(): Customer {
    return new Customer();
  }
});
