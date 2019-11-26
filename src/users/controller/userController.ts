import { User, IUserModel } from '../model/userModel';
import DBManager from '../../DBManager';

export default class UserController {
  static async getAllUsers(): Promise<IUserModel[]> {
    await DBManager.connectDatabase();
    const users = await User.find();
    return users;
  }

  static async getUser(id: string): Promise<IUserModel> {
    await DBManager.connectDatabase();
    const user = await User.findById(id);
    return user;
  }

  static async addUser(body): Promise<IUserModel> {
    await DBManager.connectDatabase();
    const { username, email, password } = body;
    const user: IUserModel = new User({
      username,
      email,
      password
    });
    await user.save();
    return user;
  }

  static async deleteUser(id: string): Promise<IUserModel> {
    await DBManager.connectDatabase();
    const user = await User.findByIdAndDelete(id);
    return user;
  }

  static async updateUser(id: string, body): Promise<IUserModel> {
    await DBManager.connectDatabase();
    const user = await User.findByIdAndUpdate(id, body);
    return user;
  }
}
