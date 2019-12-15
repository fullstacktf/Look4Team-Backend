import { User, IUserModel } from '../model/userModel';
import DBManager from '../../../utils/DBManager';
import PasswordManager from '../../../utils/PasswordManager';
import jwt from 'jsonwebtoken';
import config from '../../../config/config';

export default class AuthController {
  static async signUp(body: IUserModel): Promise<string> {
    await DBManager.connectDatabase();
    const { username, email, password } = body;
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
    await user.save();

    // Signup jwt válido durante 8h
    const token = jwt.sign({ username: user.username }, config.jwtSecret, {
      expiresIn: '1h'
    });
    return token;
  }

  static async login(body: IUserModel): Promise<string> {
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

    // Login jwt válido durante 8h
    const token = jwt.sign({ username: user.username }, config.jwtSecret, {
      expiresIn: '1h'
    });
    return token;
  }
}
