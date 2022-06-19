import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Location, LocationDocument } from './location.schema';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
  ) {}
  async addOneLocation(args: Location) {
    return this.locationModel.create({
      ...args,
      lastUpdated: new Date(),
    });
  }

  async updateOneLocation(args: Partial<Location>) {
    return this.locationModel.updateOne(
      {
        location: args.location,
      },
      {
        ...args,
        lastUpdated: new Date(),
      },
    );
  }

  async getAll() {
    return this.locationModel.find();
  }

  async deleteOneLocation(location: string) {
    return this.locationModel.deleteOne({ location });
  }
}
