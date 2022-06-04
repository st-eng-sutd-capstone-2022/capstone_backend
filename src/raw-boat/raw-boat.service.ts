import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RawBoat, RawBoatDocument } from './raw-boat.schema';

@Injectable()
export class RawBoatService {
  constructor(
    @InjectModel(RawBoat.name) private rawBoatModel: Model<RawBoatDocument>,
  ) {}

  async addOne(payload: RawBoat) {
    this.rawBoatModel.insertMany([
      {
        boatId: payload.boatId,
        latitude: payload.latitude || null,
        longtitude: payload.longtitude || null,
        batteryLevel: payload.batteryLevel || -1,
        timestamp: payload.timestamp || -1,
      },
    ]);
  }
}
