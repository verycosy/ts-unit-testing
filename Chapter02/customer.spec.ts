import { instance, mock, verify, when } from 'ts-mockito';
import { Customer, IStore, Product, Store } from '../store';

describe('CustomerTests', () => {
  it('인벤토리가 충분하면 구매 성공', () => {
    const storeMock = mock(Store);
    when(storeMock.hasEnoughInventory(Product.Shampoo, 5)).thenReturn(true);
    const customer = new Customer();

    const success = customer.purchase(instance(storeMock), Product.Shampoo, 5);

    expect(success).toBe(true);
    verify(storeMock.removeInventory(Product.Shampoo, 5)).called();
  });

  it('인벤토리가 부족하면 구매 실패', () => {
    const storeMock = mock<IStore>();
    when(storeMock.hasEnoughInventory(Product.Shampoo, 5)).thenReturn(false);
    const customer = new Customer();

    const success = customer.purchase(instance(storeMock), Product.Shampoo, 5);

    expect(success).toBe(false);
    verify(storeMock.removeInventory(Product.Shampoo, 5)).never();
  });
});
