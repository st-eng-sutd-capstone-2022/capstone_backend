import { AssignService } from '@modules/assign/assign.service';
import { RawBoatService } from '@modules/raw-boat/raw-boat.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Weight, WeightDocument } from './weight.schema';

@Injectable()
export class WeightService {
  constructor(
    @InjectModel(Weight.name) private weightModel: Model<WeightDocument>,
    private readonly assignService: AssignService,
    private readonly rawDataService: RawBoatService,
  ) {}

  async addWeight(boatId, newTimestamp, newWeight) {
    try {
      if (!(await this.assignService.isBoatExist(boatId))) {
        throw Error('Boat does not exist');
      }

      const raw = await this.rawDataService.getLast(boatId);

      return await this.weightModel.create({
        boatId,
        timestamp: newTimestamp,
        weight: newWeight,
        location: raw.location,
        zone: raw.zone,
      });
    } catch (e) {
      throw e;
    }
  }

  async getLastWeight(boatId: string): Promise<{
    timestamp: Date;
    weight: number;
  }> {
    const res = await this.weightModel
      .findOne({
        boatId,
      })
      .sort({ timestamp: -1 });

    return res?.toObject();
  }
}
