import { Document, Schema, Model, model } from 'mongoose';

export interface IGroupModel extends Document {
  name: string;
  description: string;
  avatar: string;
  users: Array<string>;
  updated: Date;
  created: Date;
}

const GroupSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: String,
  avatar: String,
  users: { type: Array, required: true },
  updated: { type: Date, default: Date.now() },
  created: { type: Date, default: Date.now() }
});

export const Group: Model<IGroupModel> = model<IGroupModel>('groups', GroupSchema);