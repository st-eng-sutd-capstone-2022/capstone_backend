import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Weight, WeightDocument } from './weight.schema';
import { Model } from 'mongoose';

@Injectable()
export class WeightService {
  constructor(
    @InjectModel(Weight.name) private weightModel: Model<WeightDocument>,
  ) {}

  createOne(boatId: string): Promise<Weight> {
    let weight = {
      boatId,
      timestamps: [],
      weights: [],
    };

    return this.weightModel.create(weight);
  }

  async addWeight(boatId, newTimestamp, newWeight): Promise<Weight> {
    try {
      const res = await this.weightModel.findOneAndUpdate(
        {
          boatId,
        },
        {
          $push: {
            timestamps: newTimestamp,
            weights: newWeight,
          },
        },
      );
      return res.toObject();
    } catch (e) {
      throw e;
    }
  }
}
