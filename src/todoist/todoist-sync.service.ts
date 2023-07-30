import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';

import { TodosService } from 'src/todos/todos.service';
import { TodoistApiService } from './todoist-api.service';

import type { ConfigurationType } from 'src/configuration/configuration';
import { TodoStatus } from 'src/todos/entities/todo.entity';

@Injectable()
export class TodoistSyncService {
  private syncToken = '*';
  private lastSyncedAt = new Date();

  constructor(
    private readonly todosService: TodosService,
    private readonly configService: ConfigService<ConfigurationType, true>,
    private readonly todoistApiService: TodoistApiService,
  ) {}

  // sync on application startup
  @Timeout(0)
  @Cron(CronExpression.EVERY_10_SECONDS)
  async syncDataFromTodoist() {
    console.log('sync from todoist');

    const result = await this.todoistApiService.sync(
      this.configService.get('TODOIST_API_KEY', { infer: true }),
      this.syncToken,
    );

    this.syncToken = result.sync_token;

    // TODO: create bulk sync function
    for (const item of result.items) {
      const internalTodo = await this.todosService.findOneByTodoistID(item.id);
      if (internalTodo) {
        this.todosService.update(internalTodo._id, {
          id: internalTodo.id,
          title: item.content,
          description: item.description,
        });
      } else {
        this.todosService.create({
          title: item.content,
          description: item.description,
          todoistID: item.id,
          status: item.checked ? TodoStatus.DONE : TodoStatus.TODO,
        });
      }
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async syncDataToTodoist() {
    console.log('sync to todoist');

    const unsyncedTodos = await this.todosService.findAllUnsyncedTodos(
      this.lastSyncedAt,
    );

    console.log('unsyncedTodos', unsyncedTodos);

    for (const todo of unsyncedTodos) {
      if (todo.todoistID) {
        // TODO: fix 429 Too Many Requests
        // * reduce numbers of Requests
        // * handle retries using a queue
        //
        // this.todoistApiService.updateTask(
        //   this.configService.get('TODOIST_API_KEY'),
        //   todo.todoistID,
        //   {
        //     content: todo.title,
        //     description: todo.description,
        //   },
        // );
      }
    }

    this.lastSyncedAt = new Date();
  }
}
