import { Event, IEventModel } from '../model/eventModel';
import DBManager from '../../../utils/DBManager';
import { ObjectId } from 'mongodb';
import HttpException from '../../../utils/HttpException';

export default class EventsController {
  static async getAllEvents(): Promise<IEventModel[]> {
    await DBManager.connectDatabase();
    const events = await Event.find().limit(10);
    if (!events) {
      throw new HttpException(404, 'Events not found');
    }
    return events;
  }

  static async getEvent(eventId: string): Promise<IEventModel> {
    await DBManager.connectDatabase();
    const event = await Event.findOne({ _id: new ObjectId(eventId) });
    if (!event) {
      throw new HttpException(404, 'Event not found');
    }
    return event;
  }

  static async addEvent(body: IEventModel): Promise<IEventModel> {
    await DBManager.connectDatabase();
    const { name, description, place, datetime, image, sport, creator } = body;
    if (!(name && place && datetime)) {
      throw new HttpException(401, 'Empty name, place or datetime');
    }
    const event: IEventModel = new Event({
      name,
      description,
      place,
      datetime,
      image,
      sport,
      creator
    });
    try {
      await event.save();
    } catch (error) {
      throw new HttpException(400, 'Error trying to add event');
    }
    return event;
  }

  static async deleteEvent(eventId: string): Promise<IEventModel> {
    await DBManager.connectDatabase();
    const event = await Event.findOneAndDelete({ _id: new ObjectId(eventId) });
    if (!event) {
      throw new HttpException(404, 'Event not found');
    }
    return event;
  }

  static async updateEvent(eventId: string, body: IEventModel): Promise<IEventModel> {
    await DBManager.connectDatabase();
    const event = await Event.findOneAndUpdate({ _id: new ObjectId(eventId) }, body);
    if (!event) {
      throw new HttpException(404, 'Event not found');
    }
    return event;
  }

  static async getUserEvents(username: string): Promise<IEventModel[]> {
    await DBManager.connectDatabase();
    const events = await Event.find({ participants: username });
    if (!events) {
      throw new HttpException(404, 'Events not found');
    }
    return events;
  }

  static async getLastEvents(): Promise<IEventModel[]> {
    await DBManager.connectDatabase();
    const events = await Event.find()
      .sort({ created: -1 })
      .limit(10);
    if (!events) {
      throw new HttpException(404, 'Events not found');
    }
    return events;
  }
}
