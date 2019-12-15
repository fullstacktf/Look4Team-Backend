import { User, IUserModel } from '../model/userModel';
import DBManager from '../../../utils/DBManager';
import PasswordManager from '../../../utils/PasswordManager';
import HttpException from '../../../utils/HttpException';

export default class UserController {
  static async getAllUsers(): Promise<IUserModel[]> {
    await DBManager.connectDatabase();
    const users = await User.find().limit(10);
    if (!users) {
      throw new HttpException(404, 'Users not found');
    }
    return users;
  }

  static async getUser(userName: string): Promise<IUserModel> {
    await DBManager.connectDatabase();
    const user = await User.findOne({ username: userName });
    if (!user) {
      throw new HttpException(404, 'User not found');
    }
    return user;
  }

  static async addUser(body: IUserModel): Promise<IUserModel> {
    await DBManager.connectDatabase();
    const { username, email, password, name, surname, birthDate, description, avatar } = body;

    if (!(username && email && password)) {
      throw new HttpException(401, 'Empty username, email or password');
    }

    const encryptedPassword = PasswordManager.encryptPassword(password);
    const user: IUserModel = new User({
      username,
      email,
      password: encryptedPassword,
      name,
      surname,
      birthDate,
      description,
      avatar
    });

    try {
      await user.save();
    } catch (error) {
      throw new HttpException(400, 'Error trying to add user');
    }

    return user;
  }

  static async deleteUser(userName: string): Promise<IUserModel> {
    await DBManager.connectDatabase();
    const user = await User.findOneAndDelete({ username: userName });
    if (!user) {
      throw new HttpException(404, 'User not found');
    }
    return user;
  }

  static async updateUser(userName: string, body: IUserModel): Promise<IUserModel> {
    await DBManager.connectDatabase();
    const user = await User.findOneAndUpdate({ username: userName }, body);
    if (!user) {
      throw new HttpException(404, 'User not found');
    }
    return user;
  }
}
