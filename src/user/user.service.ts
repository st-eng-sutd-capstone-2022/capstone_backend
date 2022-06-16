import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './user.schema';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async findOneWithPassword(email: string): Promise<User> {
    const user = (
      await this.userModel.findOne({
        email,
      })
    ).toObject();

    return {
      email: user.email,
      password: user.password,
      type: user.type,
      username: user.username,
      employeeId: user.employeeId,
    };
  }

  createOne(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  async updateOne(email, payload: Partial<User>): Promise<User> {
    try {
      const res = await this.userModel.findOneAndUpdate(
        {
          email,
        },
        payload,
      );

      return res.toObject();
    } catch (e) {
      throw e;
    }
  }
}
