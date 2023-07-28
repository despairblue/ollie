import { Injectable } from '@nestjs/common';

import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo, TodoStatus } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = {
      id: String(this.todos.length + 1),
      status: TodoStatus.TODO,
      ...createTodoInput,
    };

    this.todos.push(todo);

    return todo;
  }

  findAll(options: { userId: string }): Todo[] {
    return this.todos;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: string, updateTodoInput: UpdateTodoInput) {
    const todo = this.todos.find((todo) => todo.id === id);

    if (todo == null) {
      return null;
    }

    todo.description = updateTodoInput.description;
    todo.title = updateTodoInput.title;

    return todo;
  }

  markTodoAsDone(id: string) {
    const todo = this.todos.find((todo) => todo.id === id);

    if (todo == null) {
      return null;
    }

    todo.status = TodoStatus.DONE;

    return todo;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
