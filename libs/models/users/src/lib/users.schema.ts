import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BcryptService } from '@johnny-five-plant-monitor/bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  private bcrypt = new BcryptService();

  @Prop({
    required: true,
    index: { unique: true },
  })
  username: string;

  @Prop({ required: true })
  password: string;

  comparePassword(candidatePassword: string): Promise<boolean> {
    return this.bcrypt.compare(candidatePassword, this.password);
  }
}

export const UsersSchema = SchemaFactory.createForClass(User);
