import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Assign, AssignDocument } from './assign.schema';
@Injectable()
export class AssignService {
  constructor(
    @InjectModel(Assign.name) private assignModel: Model<AssignDocument>,
  ) {}

  createOne(assign: Assign): Promise<Assign> {
    // console.log(assign);
    return this.assignModel.create(assign);
  }

  async findAllAssigned(): Promise<Assign[]> {
    return await this.assignModel.find().exec();
  }

  async findOneAssigned(boatId: string): Promise<Assign> {
    try {
      const assign = await this.assignModel
        .findOne({
          boatId,
        })
        .exec();
      return assign;
    } catch (e) {
      throw e;
    }
  }

  async updateOneAssigned(id, assign: Partial<Assign>): Promise<Assign> {
    console.log(id);
    try {
      const res = await this.assignModel.findOneAndUpdate(
        {
          _id: id,
        },
        assign,
      );

      return res.toObject();
    } catch (e) {
      throw e;
    }
  }

  async deleteOneAssigned(boatId: string): Promise<Assign> {
    try {
      const assign = await this.assignModel
        .findOneAndDelete({
          boatId,
        })
        .exec();
      return assign;
    } catch (e) {
      throw e;
    }
  }
}
