import mongoose from 'mongoose';

export default class Helper {

  static connectDatabase():void {
    let uri:string = 'mongodb://127.0.0.1:27017/look4team';
    mongoose.set('useFindAndModify', false);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(uri, { useNewUrlParser: true });    
  }
}