import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BoardDocument = Board & Document;

@Schema()
export class Board {
  @Prop()
  name: string;

  @Prop()
  type: number;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
