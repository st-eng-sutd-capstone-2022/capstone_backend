import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';

export type AssignDocument = Assign & Document;

@Schema()
export class Assign extends Document {
  // @Prop({
  //   type: SchemaTypes.ObjectId,
  //   ref: Assign.name,
  // })
  // _id: Types.ObjectId;

  @Prop({
    unique: true,
  })
  serialNumber: string;

  @Prop()
  boatId: string;

  @Prop()
  location: string;

  @Prop()
  dateAssigned: string;

  @Prop()
  assignee: string;
}

export const AssignSchema = SchemaFactory.createForClass(Assign);
