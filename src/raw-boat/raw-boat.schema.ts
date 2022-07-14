import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type RawBoatDocument = RawBoat & Document;

@Schema()
export class RawBoat {
  @Prop()
  boatId: string;

  // the data
  @Prop()
  latitude: string;
  @Prop()
  longtitude: string;
  @Prop()
  batteryLevel: number;
  @Prop({
    type: Date,
  })
  timestamp: Date;
  @Prop()
  motor_on: boolean; // status
  @Prop()
  mechanism_on: boolean; // status

  @Prop()
  location: string;
  @Prop()
  zone: string;
}

export enum BoatStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MOVING = 'moving',
}

export const RawBoatSchema = SchemaFactory.createForClass(RawBoat);
