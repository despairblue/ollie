import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List } from './entities/list.entity';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List.name) private readonly listModel: Model<List>,
  ) {}

  create(createListInput: { name: string; userId: string | ObjectId }) {
    return this.listModel.create(createListInput);
  }

  findOneById(id: string) {
    return this.listModel.findOne({ _id: id });
  }

  findAllByUser(userId: string | ObjectId) {
    return this.listModel.find({ userId });
  }
}
