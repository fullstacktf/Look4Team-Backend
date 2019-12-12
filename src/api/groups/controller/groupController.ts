import { Group, IGroupModel } from '../model/groupModel';
import DBManager from '../../../utils/DBManager';
import { ObjectId } from 'mongodb';

export default class GroupController {
  static async getAllGroups(): Promise<IGroupModel[]> {
    await DBManager.connectDatabase();
    const groups = await Group.find().limit(10);
    return groups;
  }

  static async getGroup(groupId: string): Promise<IGroupModel> {
    await DBManager.connectDatabase();
    const group = await Group.findOne({ _id: new ObjectId(groupId) });
    return group;
  }

  static async addGroup(body: IGroupModel): Promise<IGroupModel> {
    await DBManager.connectDatabase();
    const { name, description, avatar } = body;
    const group: IGroupModel = new Group({
      name,
      description,
      avatar
    });
    await group.save();
    return group;
  }

  static async deleteGroup(groupId: string): Promise<IGroupModel> {
    await DBManager.connectDatabase();
    const group = await Group.findOneAndDelete({ _id: new ObjectId(groupId) });
    return group;
  }

  static async updateGroup(
    groupId: string,
    body: IGroupModel
  ): Promise<IGroupModel> {
    await DBManager.connectDatabase();
    const group = await Group.findOneAndUpdate(
      { _id: new ObjectId(groupId) },
      body
    );
    return group;
  }

  static async getUserGroups(username: string): Promise<IGroupModel[]> {
    await DBManager.connectDatabase();
    const groups = await Group.find({ users: username });
    return groups;
  }

  static async getLastGroups(): Promise<IGroupModel[]> {
    await DBManager.connectDatabase();
    const groups = await Group.find()
      .sort({ created: -1 })
      .limit(10);
    return groups;
  }
}
