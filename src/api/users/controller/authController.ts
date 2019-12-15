import { User, IUserModel } from '../model/userModel';
import DBManager from '../../../utils/DBManager';
import PasswordManager from '../../../utils/PasswordManager';
import jwt from 'jsonwebtoken';
import config from '../../../config/config';
import HttpException from '../../../utils/HttpException';

export default class AuthController {
  static async signUp(body: IUserModel): Promise<string> {
    await DBManager.connectDatabase();
    const { username, email, password } = body;
    if (!(username && email && password)) {
      throw new HttpException(401, 'Empty username, email or password');
    }
    const encryptedPassword = PasswordManager.encryptPassword(password);
    const user: IUserModel = new User({
      username,
      email,
      password: encryptedPassword,
      name: '',
      surname: '',
      birthDate: '',
      description: '',
      avatar: ''
    });

    try {
      await user.save();
    } catch (error) {
      throw new HttpException(400, 'Sign up error');
    }

    // Signup jwt válido durante 1h
    const token = jwt.sign({ username: user.username }, config.jwtSecret, {
      expiresIn: '1h'
    });
    return token;
  }

  static async login(body: IUserModel): Promise<string> {
    // Comprueba si existe username y password
    const { username, password } = body;
    if (!(username && password)) {
      throw new HttpException(401, 'Empty username or password');
    }

    // Buscar el usuario en la base de datos
    await DBManager.connectDatabase();
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    // Comprueba si las constraseñas coinciden
    if (!PasswordManager.checkPassword(password, user.password)) {
      throw new HttpException(401, 'Invalid password');
    }

    // Login jwt válido durante 1h
    const token = jwt.sign({ username: user.username }, config.jwtSecret, {
      expiresIn: '1h'
    });
    return token;
  }
}
