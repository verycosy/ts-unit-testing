export class Message {
  public header: string;
  public body: string;
  public footer: string;

  constructor(header: string, body: string, footer: string) {
    this.header = header;
    this.body = body;
    this.footer = footer;
  }
}

export interface IRenderer {
  render(message: Message): string;
}

export class MessageRenderer implements IRenderer {
  public readonly subRenderers: IRenderer[];

  constructor() {
    this.subRenderers = [
      new HeaderRenderer(),
      new BodyRenderer(),
      new FooterRenderer(),
    ];
  }

  render(message: Message): string {
    return this.subRenderers.reduce(
      (acc, cur) => acc + cur.render(message),
      ''
    );
  }
}

export class HeaderRenderer implements IRenderer {
  render(message: Message): string {
    return `<h1>${message.header}</h1>`;
  }
}

export class BodyRenderer implements IRenderer {
  render(message: Message): string {
    return `<b>${message.body}</b>`;
  }
}

export class FooterRenderer implements IRenderer {
  render(message: Message): string {
    return `<i>${message.footer}</i>`;
  }
}
