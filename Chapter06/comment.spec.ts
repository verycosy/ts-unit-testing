import { LocalDateTime, nativeJs } from 'js-joda';
import { Article } from '../comment';
import '../article-extensions';

describe('ArticleTests', () => {
  it('게시글에 댓글 추가', () => {
    const sut = new Article();
    const text = 'Common text';
    const author = 'John Doe';
    const now = LocalDateTime.from(nativeJs(new Date(2019, 4, 1)));

    sut.addComment(text, author, now);

    // 많은 공간을 차지하는 상태 검증
    expect(sut.comments.length).toEqual(1);
    expect(sut.comments[0].text).toEqual(text);
    expect(sut.comments[0].author).toEqual(author);
    expect(sut.comments[0].dateCreated).toEqual(now);
  });

  it('게시글에 댓글 추가2', () => {
    const sut = new Article();
    const text = 'Common text';
    const author = 'John Doe';
    const now = LocalDateTime.from(nativeJs(new Date(2019, 4, 1)));

    sut.addComment(text, author, now);

    // 헬퍼 메서드
    sut.shouldContainNumberOfComments(1).withComment(text, author, now);
  });
});
