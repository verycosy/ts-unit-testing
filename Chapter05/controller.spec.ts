import { instance, mock, verify, when } from 'ts-mockito';

describe('ControllerTests', () => {
  // 통신 기반 테스트
  it('환영 이메일 발송', () => {
    const emailGatewayMock = mock<IEmailGateway>(); // Mock(도구)로 mock 생성
    const sut = Controller.fromEmailGateway(instance(emailGatewayMock));

    sut.greetUser('user@email.com');

    verify(emailGatewayMock.sendGreetingEmail('user@email.com')).once(); // sut의 호출을 검사
  });

  it('보고서 생성', () => {
    const stub = mock<IDatabase>(); // Mock(도구)로 stub 생성
    when(stub.getNumberOfUsers()).thenReturn(10);
    const sut = Controller.fromDatabase(instance(stub));

    const report = sut.createReport();

    expect(report.numberOfUsers).toEqual(10);
    // verify(stub.getNumberOfUsers()).once();
    // stub으로 상호 작용 검증 -> 과잉 명세
  });
});

interface IDatabase {
  getNumberOfUsers(): number;
}

export interface IEmailGateway {
  sendGreetingEmail(userEmail: string): void;
}

class Controller {
  private _emailGateway: IEmailGateway;
  private _database: IDatabase;

  static fromEmailGateway(emailGateway: IEmailGateway): Controller {
    const controller = new Controller();
    controller._emailGateway = emailGateway;

    return controller;
  }

  static fromDatabase(database: IDatabase): Controller {
    const controller = new Controller();
    controller._database = database;

    return controller;
  }

  public greetUser(userEmail: string): void {
    this._emailGateway.sendGreetingEmail(userEmail);
  }

  public createReport(): Report {
    const numberOfUsers = this._database.getNumberOfUsers();
    return new Report(numberOfUsers);
  }
}

class Report {
  public numberOfUsers: number;

  constructor(numberOfUsers: number) {
    this.numberOfUsers = numberOfUsers;
  }
}
