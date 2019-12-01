import { Event, IEventModel } from '../model/eventsModel';
import DBManager from '../../utils/DBManager';

export default class UserController {
  static async getAllEvents(): Promise<IEventModel[]> {
    await DBManager.connectDatabase();
    const events = await Event.find();
    return events;
  }
  //id: number or string?
  static async getEvent(id: string): Promise<IEventModel> {
    await DBManager.connectDatabase();
    const event = await Event.findById(id);
    return event;
  }

  // static async addEvent(body): Promise<IEventModel> {
  //     await DBManager.connectDatabase();
  //     const { name, place, date } = body; //req?
  //     const event: IEventModel = new Event({
  //       event,
  //       place,
  //       date
  //     });
  //     await user.save();
  //     return user;
  //   }

  //id: number o string?
  static async deleteEvent(id: string): Promise<IEventModel> {
    await DBManager.connectDatabase();
    const event = await Event.findByIdAndDelete(id);
    return event;
  }

  //id: number o string?
  static async updateEvent(
    id: string,
    body: IEventModel
  ): Promise<IEventModel> {
    await DBManager.connectDatabase();
    const event = await Event.findByIdAndUpdate(id, body);
    return event;
  }
  //searchEventBy()
}
