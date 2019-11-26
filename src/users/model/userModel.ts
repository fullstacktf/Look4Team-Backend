import { Document, Schema, Model, model } from 'mongoose';

export interface IUserModel extends Document {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  nicknames: Array<string>;
  birthDate: Date;
  // favouritePlace:
  gender: string;
  description: string;
  rating: Object;
  avatar: string;
  friends: Array<string>;
  groups: Array<number>;
  events: Array<number>;
  updated: Date;
  created: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, require: true, select: false },
  name: String,
  surname: String,
  nicknames: Array,
  birthDate: Date,
  // favouritePlace: String,  // MongoDB Localizaciones
  gender: String,
  description: String,
  rating: {
    numberOfRatings: Number,
    average: Number
  },
  avatar: String,
  friends: Array,
  groups: Array,
  events: Array,
  // sports: tags
  updated: { type: Date, default: Date.now() },
  created: { type: Date, default: Date.now() }
});

export const User: Model<IUserModel> = model<IUserModel>('users', UserSchema);
