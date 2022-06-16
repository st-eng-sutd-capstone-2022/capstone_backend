import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  password: string;

  @Prop()
  type: 'super' | 'user';

  @Prop()
  username: string;

  @Prop({
    unique: true,
  })
  employeeId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
