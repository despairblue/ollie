import { Injectable } from '@nestjs/common';

import { UpdateTodoInput } from './dto/update-todo.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Todo, TodoStatus } from './todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  findAllUnsyncedTodos(lastSyncedAt: Date) {
    return this.todoModel.find({ updatedAt: { $gt: lastSyncedAt } });
  }

  create(createTodoInput: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create({
      ...createTodoInput,
      updatedAt: new Date(),
    });
  }

  async findAll(options: { userId: string }): Promise<Todo[]> {
    return this.todoModel.find();
  }

  findOne(id: string) {
    return this.todoModel.findOne({ _id: id });
  }

  findOneByTodoistID(id: string) {
    return this.todoModel.findOne({ todoistID: id });
  }

  // findOneByExternalId(id: string) {
  //   return `This action returns a #${id} todo`;
  // }

  update(id: string | Types.ObjectId, updateTodoInput: UpdateTodoInput) {
    return this.todoModel.updateOne({ _id: id }, updateTodoInput, {
      new: true,
    });
  }

  markTodoAsDone(id: string) {
    return this.todoModel.updateOne(
      { _id: id },
      { status: TodoStatus.DONE },
      { new: true },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
