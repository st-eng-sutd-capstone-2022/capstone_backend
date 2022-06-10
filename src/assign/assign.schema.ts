import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type AssignDocument = Assign & Document;

@Schema()
export class Assign extends Document {
  //@Prop()
}

export const AssignSchema = SchemaFactory.createForClass(Assign);
