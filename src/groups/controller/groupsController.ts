import { Group, IGroupModel } from '../model/groupsModel';
import DBManager from '../../utils/DBManager';

export default class GroupController {
  static async getAllGroups(): Promise<IGroupModel[]> {
    await DBManager.connectDatabase();
    const groups = await Group.find();
    return groups;
  }

  static async getGroup(id: string): Promise<IGroupModel> {
    await DBManager.connectDatabase();
    const group = await Group.findById(id);
    return group;
  }

  static async addGroup(body: IGroupModel): Promise<IGroupModel> {
    await DBManager.connectDatabase();
    const { name } = body;
    const group: IGroupModel = new Group({
      name
    });
    await group.save();
    return group;
  }

  static async deleteGroup(id: string): Promise<IGroupModel> {
    await DBManager.connectDatabase();
    const group = await Group.findByIdAndDelete(id);
    return group;
  }

  static async updateGroup(
    id: string,
    body: IGroupModel
  ): Promise<IGroupModel> {
    await DBManager.connectDatabase();
    const group = await Group.findByIdAndUpdate(id, body);
    return group;
  }
}
