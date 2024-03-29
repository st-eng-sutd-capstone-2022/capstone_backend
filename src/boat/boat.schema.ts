// TODO: add {required: true} if needed

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type BoatDocument = Boat & Document;

@Schema()
export class Boat extends Document {
  @Prop()
  boatId: string;

  @Prop()
  batteryLevel: number;
  @Prop()
  status: string;
  @Prop()
  zone: number;

  // location
  @Prop()
  latitude: string;
  @Prop()
  longtitude: string;

  // @Prop({ type: TimedBoatDataSchema, default: [] })
  // details:
}

export const BoatSchema = SchemaFactory.createForClass(Boat);
