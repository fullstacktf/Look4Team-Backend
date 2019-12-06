import { Document, Schema, Model, model } from 'mongoose';

export interface IUserModel extends Document {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  nicknames: string[];
  birthDate: Date;
  // favouritePlace: String,  // MongoDB Localizaciones
  description: string;
  rating: Object;
  avatar: string;
  friends: Object[];
  groups: string[];
  events: string[];
  sports: string[];
  updated: Date;
  created: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  name: String,
  surname: String,
  nicknames: [String],
  birthDate: Date,
  // favouritePlace: String,  // MongoDB Localizaciones
  description: String,
  rating: {
    numberOfRatings: Number,
    average: Number
  },
  avatar: String,
  friends: [
    {
      username: String,
      status: String
    }
  ],
  groups: [String],
  events: [String],
  sports: [String],
  updated: { type: Date, default: Date.now() },
  created: { type: Date, default: Date.now() }
});

export const User: Model<IUserModel> = model<IUserModel>('users', UserSchema);
