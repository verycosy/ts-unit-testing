export class User {
  private _name: string;

  set name(name: string) {
    this._name = this.normalizeName(name);
  }

  // 이 메서드를 테스트에서 직접 확인하지 않고, 클래스의 식별할 수 있는 동작인 setter로 검증해야 한다.
  public normalizeName(name: string): string {
    const result = (name ?? '').trim();

    if (result.length > 50) {
      return result.substring(0, 50);
    }

    return result;
  }
}

export class UserController {
  public renameUser(userId: number, newName: string): void {
    const user = this.getUserFromDatabase(userId);
    user.name = newName;
    this.saveUserToDatabase(user);
  }

  private getUserFromDatabase(userId: number): User {
    return new User();
  }

  private saveUserToDatabase(user: User): void {}
}
