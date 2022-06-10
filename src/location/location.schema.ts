import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema()
export class Location extends Document {

  //@Prop()
  
}

export const LocationSchema = SchemaFactory.createForClass(Location);