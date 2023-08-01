import { Injectable } from '@nestjs/common';

import { UpdateTodoInput } from './dto/update-todo.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo, TodoStatus } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  findAllUnsyncedTodos(lastSyncedAt: Date) {
    return this.todoModel.find({ updatedAt: { $gt: lastSyncedAt } });
  }

  create(createTodoInput: CreateTodoDto): Promise<Todo> {
    console.log(createTodoInput);
    return this.todoModel.create({
      ...createTodoInput,
      updatedAt: new Date(),
    });
  }

  findAllByUser(options: { userId: string | ObjectId }): Promise<Todo[]> {
    return this.todoModel.find({ userId: options.userId });
  }

  findOne(id: string) {
    return this.todoModel.findOne({ _id: id });
  }

  findOneByTodoistID(id: string) {
    return this.todoModel.findOne({ todoistID: id });
  }

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
}
