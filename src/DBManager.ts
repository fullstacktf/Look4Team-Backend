import mongoose from 'mongoose';

const MONGO_URL: string = 'mongodb://127.0.0.1:27017/look4team';

export default class DBManager {
  static db;

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
