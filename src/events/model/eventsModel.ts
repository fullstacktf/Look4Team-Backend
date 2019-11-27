import { Document, Schema, Model, model } from 'mongoose';

export interface IEventModel extends Document {
    //ID?
    //place_ID: number;
    name: string;
    description: string;
    date: Date;
    //time: Time; ?
    image: string; //?
    //sport_ID
}

const EventSchema: Schema = new Schema({
    //ID: { type: Number, required: true },
    //place_ID: { type: Number, required: true?},
    name: { type: String, required: true },
    description: String,
    date: Date, //req: true?
    //time: Time,
    image: String,
    //sport_ID { type: Number, required: true}
})

export const Event: Model<IEventModel> = model<IEventModel>('events', EventSchema);
