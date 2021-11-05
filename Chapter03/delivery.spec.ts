import { LocalDateTime } from 'js-joda';
import { Delivery, DeliveryService } from '../delivery';

describe('DeliveryServiceTests', () => {
  // it('과거 날짜인 배송은 유효하지 않음', () => {
  //   const sut = new DeliveryService();
  //   const pastDate = LocalDateTime.now().plusDays(-1);
  //   const delivery = new Delivery(pastDate);
  //
  //   const isValid = sut.isDeliveryValid(delivery);
  //
  //   expect(isValid).toEqual(false);
  // });
  //
  // it.each([
  //   [-1, false],
  //   [0, false],
  //   [1, false],
  //   [2, true],
  // ])(
  //   '유효하지 않은 배송일 (%s일) 감지 가능',
  //   (daysFromNow: number, expected: boolean) => {
  //     const sut = new DeliveryService();
  //     const deliveryDate = LocalDateTime.now().plusDays(daysFromNow);
  //     const delivery = new Delivery(deliveryDate);
  //
  //     const isValid = sut.isDeliveryValid(delivery);
  //
  //     expect(isValid).toEqual(expected);
  //   }
  // );

  it.each([[-1], [0], [1]])(
    '유효하지 않은 배송일 (%s일) 감지',
    (daysFromNow: number) => {
      const sut = new DeliveryService();
      const deliveryDate = LocalDateTime.now().plusDays(daysFromNow);
      const delivery = new Delivery(deliveryDate);

      const isValid = sut.isDeliveryValid(delivery);

      expect(isValid).toEqual(false);
    }
  );

  it('가장 빠른 배송일은 오늘 날짜에서 이틀 뒤', () => {
    const sut = new DeliveryService();
    const deliveryDate = LocalDateTime.now().plusDays(2);
    const delivery = new Delivery(deliveryDate);

    const isValid = sut.isDeliveryValid(delivery);

    expect(isValid).toEqual(true);
  });
});
