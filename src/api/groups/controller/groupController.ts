import { Group, IGroupModel } from '../model/groupModel';
import DBManager from '../../../utils/DBManager';
import { ObjectId } from 'mongodb';
import HttpException from '../../../utils/HttpException';

export default class GroupController {
  static async getAllGroups(): Promise<IGroupModel[]> {
    await DBManager.connectDatabase();
    const groups = await Group.find().limit(10);
    if (!groups) {
      throw new HttpException(404, 'Groups not found');
    }
    return groups;
  }

  static async getGroup(groupId: string): Promise<IGroupModel> {
    await DBManager.connectDatabase();
    const group = await Group.findOne({ _id: new ObjectId(groupId) });
    if (!group) {
      throw new HttpException(404, 'Group not found');
    }
    return group;
  }

  static async addGroup(body: IGroupModel): Promise<IGroupModel> {
    await DBManager.connectDatabase();
    const { name, description, avatar } = body;
    if (!name) {
      throw new HttpException(401, 'Empty group name');
    }
    const group: IGroupModel = new Group({
      name,
      description,
      avatar
    });
    try {
      await group.save();
    } catch (error) {
      throw new HttpException(400, 'Error trying to add group');
    }

    return group;
  }

  static async deleteGroup(groupId: string): Promise<IGroupModel> {
    await DBManager.connectDatabase();
    const group = await Group.findOneAndDelete({ _id: new ObjectId(groupId) });
    if (!group) {
      throw new HttpException(404, 'Group not found');
    }
    return group;
  }

  static async updateGroup(groupId: string, body: IGroupModel): Promise<IGroupModel> {
    await DBManager.connectDatabase();
    const group = await Group.findOneAndUpdate({ _id: new ObjectId(groupId) }, body);
    if (!group) {
      throw new HttpException(404, 'Group not found');
    }
    return group;
  }

  static async getUserGroups(username: string): Promise<IGroupModel[]> {
    await DBManager.connectDatabase();
    const groups = await Group.find({ users: username });
    if (!groups) {
      throw new HttpException(404, 'Groups not found');
    }
    return groups;
  }

  static async getLastGroups(): Promise<IGroupModel[]> {
    await DBManager.connectDatabase();
    const groups = await Group.find()
      .sort({ created: -1 })
      .limit(10);
    if (!groups) {
      throw new HttpException(404, 'Groups not found');
    }
    return groups;
  }
}
