import { User, IUserModel } from '../model/userModel';
import DBManager from '../../../utils/DBManager';
import config from '../../../config/config';
import PasswordManager from '../../../utils/PasswordManager';
import jwt from 'jsonwebtoken';

export default class UserController {
  static async getAllUsers(): Promise<IUserModel[]> {
    await DBManager.connectDatabase();
    const users = await User.find().limit(10);
    return users;
  }

  static async getUser(userName: string): Promise<IUserModel> {
    await DBManager.connectDatabase();
    const user = await User.findOne({ username: userName });
    return user;
  }

  static async addUser(body: IUserModel): Promise<IUserModel> {
    await DBManager.connectDatabase();
    const {
      username,
      email,
      password,
      name,
      surname,
      birthDate,
      description,
      avatar
    } = body;

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
    await user.save();
    return user;
  }

  static async deleteUser(userName: string): Promise<IUserModel> {
    await DBManager.connectDatabase();
    const user = await User.findOneAndDelete({ username: userName });
    return user;
  }

  static async updateUser(
    userName: string,
    body: IUserModel
  ): Promise<IUserModel> {
    await DBManager.connectDatabase();
    const user = await User.findOneAndUpdate({ username: userName }, body);
    return user;
  }

  static async signIn(body: IUserModel): Promise<string> {
    // Comprueba si existe username y password
    const { username, password } = body;
    if (!(username && password)) {
      throw new Error('Empty username or password');
    }

    // Buscar el usuario en la base de datos
    await DBManager.connectDatabase();
    const user = await User.findOne({ username: username });

    // Comprueba si las constraseñas coinciden
    if (!PasswordManager.checkPassword(password, user.password)) {
      throw new Error('Invalid password');
    }

    // SignIn jwt válido durante 8h
    const token = jwt.sign({ username: user.username }, config.jwtSecret, {
      expiresIn: '8h'
    });
    return token;
  }
}
