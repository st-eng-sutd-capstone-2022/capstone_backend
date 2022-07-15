import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Weight, WeightDocument } from './weight.schema';

@Injectable()
export class WeightService {
  constructor(
    @InjectModel(Weight.name) private weightModel: Model<WeightDocument>,
  ) {}

  createOne(boatId: string): Promise<Weight> {
    const weight = {
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

  async getLastWeight(boatId: string): Promise<{
    timestamp: Date;
    weight: number;
  }> {
    const res = await this.weightModel.findOne({
      boatId,
    });

    return {
      weight: res.weights.pop() as number,
      timestamp: res.timestamps.pop(),
    };
  }
}
