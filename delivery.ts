import { LocalDateTime } from 'js-joda';

export class Delivery {
  public date: LocalDateTime;

  constructor(date: LocalDateTime) {
    this.date = date;
  }
}

export class DeliveryService {
  public isDeliveryValid(delivery: Delivery): boolean {
    return delivery.date >= LocalDateTime.now().plusDays(2);
  }
}
