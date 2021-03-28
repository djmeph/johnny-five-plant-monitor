import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

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

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

export const UsersSchema = SchemaFactory.createForClass(User);
