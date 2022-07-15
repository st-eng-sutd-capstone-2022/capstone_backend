import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeightDocument = Weight & Document;

@Schema()
export class Weight extends Document {
  @Prop()
  boatId: string;

  @Prop()
  timestamp: Date;

  @Prop()
  weight: number;

  @Prop()
  location: string;
  @Prop()
  zone: string;
}

export const WeightSchema = SchemaFactory.createForClass(Weight);
