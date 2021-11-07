import { LocalDateTime } from 'js-joda';

export class Comment {
  constructor(
    public readonly text: string,
    public readonly author: string,
    public readonly dateCreated: LocalDateTime
  ) {}

  protected equals(other: Comment): boolean {
    return (
      this.text === other.text &&
      this.author === other.author &&
      this.dateCreated.equals(other.dateCreated)
    );
  }
}

export class Article {
  private readonly _comments: Comment[] = [];

  get comments() {
    return this._comments;
  }

  public addComment(text: string, author: string, now: LocalDateTime) {
    this._comments.push(new Comment(text, author, now));
  }
}
