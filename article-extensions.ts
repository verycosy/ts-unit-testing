import { LocalDateTime } from 'js-joda';
import { Article } from './comment';

// extension method
// 헬퍼 메서드 사용
Article.prototype.shouldContainNumberOfComments = function (
  commentCount: number
): Article {
  expect(this.comments.length).toEqual(commentCount);
  return this;
};

Article.prototype.withComment = function (
  text: string,
  author: string,
  dateCreated: LocalDateTime
): Article {
  const comment = this.comments.filter(
    (x) =>
      x.text === text &&
      x.author === author &&
      x.dateCreated.equals(dateCreated)
  );

  expect(comment).not.toBeNull();
  return this;
};
