import { SchemaFactory } from '@nestjs/mongoose';
import { Logging } from '../entities';

export const LoggingSchema = SchemaFactory.createForClass(Logging);
