import { genSaltSync, hashSync, compareSync } from 'bcrypt';

export default class PasswordManager {
  static encryptPassword(password: string): string {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const encryptedPassword: string = hashSync(password, salt);
    return encryptedPassword;
  }

  static checkPassword(password: string, encryptedPassword: string): boolean {
    return compareSync(password, encryptedPassword);
  }
}
