import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLoggingDto, UpdateLoggingDto } from '../../dto';
import { Logging } from '../../entities';

@Injectable()
export class LoggingService {
  constructor(
    @InjectModel(Logging.name) private readonly loggingModel: Model<Logging>,
  ) {}

  findAll() {
    return this.loggingModel.find().exec();
  }

  async findOne(id: string) {
    const log = await this.loggingModel.findOne({ _id: id }).exec();

    if (!log) {
      throw new NotFoundException(`Log with id:${id} not found`);
    }

    return log;
  }

  create(createLoggingDto: CreateLoggingDto) {
    const coffee = new this.loggingModel(createLoggingDto);
    return coffee.save();
  }

  async update(id: string, updateLoggingDto: UpdateLoggingDto) {
    const foundLog = await this.loggingModel
      .findOneAndUpdate({ _id: id }, { $set: updateLoggingDto }, { new: true })
      .exec();

    if (!foundLog) {
      throw new NotFoundException(`Log with id: ${id} not found`);
    }

    return foundLog;
  }

  async remove(id: string) {
    const log = await this.findOne(id);
    return log.remove();
  }
}
