import { Event, IEventModel } from '../model/eventModel';
import DBManager from '../../../utils/DBManager';
import { ObjectId } from 'mongodb';

export default class EventsController {
  static async getAllEvents(): Promise<IEventModel[]> {
    await DBManager.connectDatabase();
    const events = await Event.find().limit(10);
    return events;
  }

  static async getEvent(eventId: string): Promise<IEventModel> {
    await DBManager.connectDatabase();
    const event = await Event.findOne({ _id: new ObjectId(eventId) });
    return event;
  }

  static async addEvent(body: IEventModel): Promise<IEventModel> {
    await DBManager.connectDatabase();
    const { name, description, place, datetime, image, sport, creator } = body;
    const event: IEventModel = new Event({
      name,
      description,
      place,
      datetime,
      image,
      sport,
      creator
    });
    await event.save();
    return event;
  }

  static async deleteEvent(eventId: string): Promise<IEventModel> {
    await DBManager.connectDatabase();
    const event = await Event.findOneAndDelete({ _id: new ObjectId(eventId) });
    return event;
  }

  static async updateEvent(
    eventId: string,
    body: IEventModel
  ): Promise<IEventModel> {
    await DBManager.connectDatabase();
    const event = await Event.findOneAndUpdate(
      { _id: new ObjectId(eventId) },
      body
    );
    return event;
  }

  static async getUserEvents(username: string): Promise<IEventModel[]> {
    await DBManager.connectDatabase();
    const events = await Event.find({ participants: username });
    return events;
  }

  static async getLastEvents(): Promise<IEventModel[]> {
    await DBManager.connectDatabase();
    const events = await Event.find()
      .sort({ created: -1 })
      .limit(10);
    return events;
  }
}
