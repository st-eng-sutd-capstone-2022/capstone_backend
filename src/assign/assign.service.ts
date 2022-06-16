import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Assign, AssignDocument } from './assign.schema';
@Injectable()
export class AssignService {
  constructor(
    @InjectModel(Assign.name) private assignModel: Model<AssignDocument>,
  ) {}

  createOne(assign: Assign): Promise<Assign> {
    console.log(assign);
    return this.assignModel.create(assign);
  }
}
