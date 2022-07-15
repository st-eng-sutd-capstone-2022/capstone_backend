import { AssignService } from '@modules/assign/assign.service';
import { RawBoatService } from '@modules/raw-boat/raw-boat.service';
import { WeightService } from '@modules/weight/weight.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Location, LocationDocument } from './location.schema';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
    private readonly assignService: AssignService,
    private readonly weightService: WeightService,
    private readonly rawDataService: RawBoatService,
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

  async getLiveboats() {
    const boats = await this.assignService.findAllAssigned();

    const arr = [];

    for (const { boatId } of boats) {
      let res = { boatId };
      const weight = await this.weightService.getLastWeight(boatId);

      res['weight'] = {};
      res['weight'].kg = weight?.weight || -1;
      res['weight'].lastUpdated = weight?.timestamp || -1;

      const lastRaw = await this.rawDataService.getLast(boatId);

      res = { ...res, ...lastRaw };
      arr.push(res);
    }

    return arr;
  }
}
