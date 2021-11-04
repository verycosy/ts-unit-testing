export interface IStore {
  hasEnoughInventory(product: Product, quantity: number): boolean;
  removeInventory(product: Product, quantity: number): void;
  addInventory(product: Product, quantity: number): void;
  getInventory(product: Product): number;
}

export enum Product {
  Shampoo,
  Book,
}

export class Store implements IStore {
  private readonly _inventory = new Map<Product, number>();

  private changeQuantity(product: Product, quantity: number): void {
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
    this.changeQuantity(product, remaining - quantity);
  }

  public addInventory(product: Product, quantity: number): void {
    if (this._inventory.has(product)) {
      const remaining = this.getInventory(product);
      this.changeQuantity(product, remaining + quantity);
    } else {
      this.changeQuantity(product, quantity);
    }
  }

  public getInventory(product: Product): number {
    const remaining = this._inventory.get(product);
    return remaining ?? 0;
  }
}

export class Customer {
  public purchase(store: IStore, product: Product, quantity: number): boolean {
    if (!store.hasEnoughInventory(product, quantity)) {
      return false;
    }

    store.removeInventory(product, quantity);
    return true;
  }
}
