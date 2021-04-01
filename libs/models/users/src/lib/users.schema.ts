import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    index: { unique: true },
  })
  username: string;

  @Prop({ required: true })
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserSignup {
  username: string;
  password: string;
}
