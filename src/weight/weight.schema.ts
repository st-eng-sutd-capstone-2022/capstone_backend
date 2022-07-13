import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';

export type WeightDocument = Weight & Document;

@Schema()
export class Weight extends Document {
  @Prop()
  boatId: string;

  @Prop()
  timestamps: Array<Date>;

  @Prop()
  weights: Array<Number>;
}

export const WeightSchema = SchemaFactory.createForClass(Weight);
