import { User, IUserModel } from '../model/userModel';
import Helper from '../../Helper';
import { ObjectId } from 'mongodb';

export default class UserController {

  static async getAllUsers () {
    Helper.connectDatabase();
    const users = await User.find();
    return users;
  }

  static async getUser (id:string) {
    Helper.connectDatabase();
    const users = await User.find(new ObjectId(id));
    return users;
  }

  static async addUser(body) {
    const { username, email, password } = body;
    const user:IUserModel = new User({
      username,
      email,
      password
    });
    await user.save();
    return user;
  }

  static async deleteUser(id:string) {
    const user = await User.findByIdAndDelete(new ObjectId(id));
    return user;
  }

  static async updateUser(id:string, body) {
    const user = await User.findByIdAndUpdate(new ObjectId(id), body);
    return user;
  }
  
}