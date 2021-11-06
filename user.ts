// 구현 세부 사항이 유출된 설계
// 클라이언트의 목표에 직결되지 않는다
export class User {
  public name: string;
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

    const normalizedName = user.normalizeName(newName);
    user.name = normalizedName;

    this.saveUserToDatabase(user);
  }

  private getUserFromDatabase(userId: number): User {
    return new User();
  }

  private saveUserToDatabase(user: User): void {}
}
