import mongoose from 'mongoose';
import config from '../config/config';

const MONGO_URL: string = config.db;

export default class DBManager {
  static db;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static async connectDatabase() {
    if (!this.db) {
      mongoose.set('useFindAndModify', false);
      mongoose.set('useUnifiedTopology', true);
      this.db = await mongoose
        .connect(MONGO_URL, { useNewUrlParser: true })
        .catch((err: Error) => {
          throw new Error(`Database initial connection error ${err}`);
        });
    }
    return this.db;
  }
}
