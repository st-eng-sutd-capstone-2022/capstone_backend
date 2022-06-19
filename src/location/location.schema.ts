import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema()
export class Location extends Document {
  @Prop({
    unique: true,
  })
  location: string;

  @Prop()
  long: number;

  @Prop()
  lat: number;

  @Prop()
  zones: Zone[];
}
export class Zone {
  name: string;
  lat: number[];
  long: number[];
}

export const LocationSchema = SchemaFactory.createForClass(Location);
