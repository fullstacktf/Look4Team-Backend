import mongoose from 'mongoose';
import config from '../config/config';
import HttpException from './HttpException';

const MONGO_URL: string = config.db;

export default class DBManager {
  static db;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static async connectDatabase() {
    if (!this.db) {
      mongoose.set('useFindAndModify', false);
      mongoose.set('useUnifiedTopology', true);
      this.db = await mongoose.connect(MONGO_URL, { useNewUrlParser: true }).catch(() => {
        throw new HttpException(500, 'Database connection error');
      });
    }
    return this.db;
  }
}
