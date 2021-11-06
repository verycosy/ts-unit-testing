import { instance, mock, verify, when } from 'ts-mockito';

describe('CustomerControllerTests', () => {
  it.skip('구매 완료', () => {
    const emailGatewayMock = mock<IEmailGateway>();
    const sut = new CustomerController(instance(emailGatewayMock));

    const isSuccess = sut.purchase(1, 2, 5);

    expect(isSuccess).toEqual(true);
    verify(
      emailGatewayMock.sendReceipt('customer@email.com', 'Shampoo', 5)
    ).once();
    // 시스템이 구매에 대한 영수증을 보내는지 검증
  });
});

describe('CustomerTests', () => {
  it('인벤토리가 충분할 때 구매 성공', () => {
    const storeMock = mock<IStore>();
    when(storeMock.hasEnoughInventory(Product.shampoo, 5)).thenReturn(true);
    const customer = new Customer();

    const success = customer.purchase(instance(storeMock), Product.shampoo, 5);

    expect(success).toEqual(true);
    // verify(storeMock.removeInventory(Product.shampoo, 5)).once();

    // Customer에서 Store 클래스로스의 메서드 호출은 애플리케이션 경계를 넘지 않는다.
    // 또한 클라이언트(CustomerController)가 목표(구매)를 달성하는 데 도움이 되는 연산이나 상태가 아님.
    // 구매라는 목표에 직접적인 관련이 있는 멤버는 customer.purchase()와 store.getInventory() 둘 뿐이다.
    // purchase 메서드는 구매를 시작하고, getInventory 메서드는 구매가 완료된 후 시스템 상태를 보여준다
    // removeInventory 메서드 호출은 고객의 목표로 가는 중간 단계, 즉 구현 세부 세항에 해당한다. -> 취약한 테스트
  });
});

class CustomerController {
  private readonly _customerRepository: CustomerRepository;
  private readonly _productRepository: ProductRepository;
  private readonly _mainStore: Store;
  private readonly _emailGateway: IEmailGateway;

  constructor(emailGateway: IEmailGateway) {
    this._emailGateway = emailGateway;
  }

  public purchase(
    customerId: number,
    productId: number,
    quantity: number
  ): boolean {
    const customer = this._customerRepository.getById(customerId);
    const product = this._productRepository.getById(productId);

    const isSuccess = customer.purchase(this._mainStore, product, quantity);

    if (isSuccess) {
      this._emailGateway.sendReceipt(customer.email, product.name, quantity);
    }

    return isSuccess;
  }
}

interface IEmailGateway {
  sendReceipt(email: string, productName: string, quantity: number): void;
}

class EmailGateway implements IEmailGateway {
  public sendReceipt(
    email: string,
    productName: string,
    quantity: number
  ): void {}
}

class ProductRepository {
  public getById(productId: number): Product {
    return new Product();
  }
}

class CustomerRepository {
  public getById(customerId: number): Customer {
    return new Customer();
  }
}

interface IStore {
  hasEnoughInventory(product: Product, quantity: number): boolean;
  removeInventory(product: Product, quantity: number): void;
  addInventory(product: Product, quantity: number): void;
  getInventory(product: Product): number;
}

class Store implements IStore {
  public id: number;
  private readonly _inventory = new Map<Product, number>();

  private changeProductQuantity(product: Product, quantity: number): void {
    this._inventory.set(product, quantity);
  }

  public hasEnoughInventory(product: Product, quantity: number): boolean {
    return this.getInventory(product) >= quantity;
  }

  public removeInventory(product: Product, quantity: number): void {
    if (!this.hasEnoughInventory(product, quantity)) {
      throw new Error('Not enough inventory');
    }

    const remaining = this.getInventory(product);
    this.changeProductQuantity(product, remaining - quantity);
  }

  public addInventory(product: Product, quantity: number): void {
    if (this._inventory.has(product)) {
      const remaining = this.getInventory(product);
      this.changeProductQuantity(product, remaining + quantity);
    } else {
      this.changeProductQuantity(product, quantity);
    }
  }

  public getInventory(product: Product): number {
    const remaining = this._inventory.get(product);
    return remaining ?? 0;
  }
}

class Product {
  public id: number;
  public name: string;
  public static shampoo: Product;
}

class Customer {
  public email: string;

  public purchase(store: IStore, product: Product, quantity: number): boolean {
    if (!store.hasEnoughInventory(product, quantity)) {
      return false;
    }

    store.removeInventory(product, quantity);
    return true;
  }
}
