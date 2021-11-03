import { greeting } from '.';

describe('index', () => {
  it('Hello, World를 반환한다', () => {
    expect(greeting()).toBe('Hello, World!');
  });
});
