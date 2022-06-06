// TODO: add {required: true} if needed

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type BoatDocument = Boat & Document;

// nested detail schema
// @Schema()
// export class TimedBoatData extends Document {
//     @Prop()
//     date: Date;
//     @Prop()
//     weight: number;
//     @Prop()
//     activeness: number;
// }
// export const TimedBoatDataSchema = SchemaFactory.createForClass(TimedBoatData);

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

//   @Prop({ type: TimedBoatDataSchema, default: [] })
//   details: 
  
}

export const BoatSchema = SchemaFactory.createForClass(Boat);