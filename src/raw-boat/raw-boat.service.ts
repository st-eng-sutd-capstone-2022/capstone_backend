import { Zone } from '@modules/location/location.dto';
import { Location, LocationDocument } from '@modules/location/location.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BoatStatus, RawBoat, RawBoatDocument } from './raw-boat.schema';

const isInsideNPoly = (
  vertx: number[],
  verty: number[],
  testx: number,
  testy: number,
): boolean => {
  let i = 0;
  let j = 0;
  let c = false;
  const noOfVertices = vertx.length;

  for (i = 0, j = noOfVertices - 1; i < noOfVertices; j = i++) {
    if (
      // within the y value
      verty[i] > testy !== verty[j] > testy &&
      testx <
        ((vertx[j] - vertx[i]) * (testy - verty[i])) / (verty[j] - verty[i]) +
          vertx[i]
    )
      c = !c; // flip the flag whenever the ray crosses an edge
  }
  return c;
};

const getLocationZones = (locations) =>
  locations
    .reduce(
      (prev, curr) => [
        ...prev,
        curr.zones.map((zone) => ({
          ...zone,
          location: curr.location,
        })),
      ],
      [],
    )
    .flat();

@Injectable()
export class RawBoatService {
  constructor(
    @InjectModel(RawBoat.name) private rawBoatModel: Model<RawBoatDocument>,
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
  ) {}

  async addOne(payload: RawBoat) {
    const status =
      (payload.mechanism_on && BoatStatus.ACTIVE) ||
      (payload.motor_on && BoatStatus.MOVING) ||
      BoatStatus.INACTIVE;

    const zones = getLocationZones(await this.locationModel.find());

    let boatZone = null;
    let boatLocation = null;

    zones.some((zone) => {
      const insideZone = isInsideNPoly(
        zone.lats,
        zone.longs,
        parseFloat(payload.latitude),
        parseFloat(payload.longtitude),
      );

      console.log('zones', insideZone);

      if (insideZone) {
        boatZone = zone.name;
        boatLocation = zone.location;
      }
      return insideZone;
    });

    console.log('send to BE', {
      boatId: payload.boatId,
      latitude: payload.latitude || null,
      longtitude: payload.longtitude || null,
      batteryLevel: payload.batteryLevel || -1,
      timestamp: payload.timestamp || -1,
      status,
      zone: boatZone,
      location: boatLocation,
    });
    this.rawBoatModel.insertMany([
      {
        boatId: payload.boatId,
        latitude: payload.latitude || null,
        longtitude: payload.longtitude || null,
        batteryLevel: payload.batteryLevel || -1,
        timestamp: payload.timestamp || -1,
        status,
        zone: boatZone,
        location: boatLocation,
      },
    ]);
  }
}
