import {
  BodyRenderer,
  FooterRenderer,
  HeaderRenderer,
  IRenderer,
  Message,
  MessageRenderer,
} from '../renderer';

describe('MessageRendererTests', () => {
  //   it('MessageRenderer가 올바른 하위 renderer를 사용', () => {
  //     const sut = new MessageRenderer();
  //
  //     const renderers: IRenderer[] = sut.subRenderers;
  //
  //     expect(renderers.length).toEqual(3);
  //     expect(renderers[0]).toBeInstanceOf(HeaderRenderer);
  //     expect(renderers[1]).toBeInstanceOf(BodyRenderer);
  //     expect(renderers[2]).toBeInstanceOf(FooterRenderer);
  //   });

  it('메시지 렌더링', () => {
    const sut = new MessageRenderer();
    const message = new Message('h', 'b', 'f');

    const html = sut.render(message);

    expect(html).toEqual('<h1>h</h1><b>b</b><i>f</i>');
  });
});
