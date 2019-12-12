import { Document, Schema, Model, model } from 'mongoose';

export interface IEventModel extends Document {
  name: string;
  description: string;
  place: string;
  datetime: Date;
  image: string;
  sport: string;
  creator: string;
  participants: string;
  updated: Date;
  created: Date;
  // comments
  // status
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: String,
  place: String,
  datetime: { type: Date, required: true, default: Date.now() },
  image: String,
  sport: String,
  creator: String,
  participants: [String],
  updated: { type: Date, default: Date.now() },
  created: { type: Date, default: Date.now() }
  // comments
  // status
});

export const Event: Model<IEventModel> = model<IEventModel>(
  'events',
  EventSchema
);
