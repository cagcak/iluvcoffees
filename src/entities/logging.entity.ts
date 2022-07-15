import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Logging extends Document {
  @Prop()
  name: string;

  @Prop({ default: '', isRequired: false })
  description: string;

  @Prop()
  timestamp: string;

  @Prop([String])
  messages: string[];
}
