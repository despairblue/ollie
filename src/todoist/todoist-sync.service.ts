import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';

import { TodosService } from '../todos/todos.service';
import { TodoistApiService } from './todoist-api.service';

import { TodoStatus } from '../todos/entities/todo.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TodoistSyncService {
  private lastSyncedAt = new Date();

  constructor(
    private readonly todosService: TodosService,
    private readonly todoistApiService: TodoistApiService,
    private readonly usersService: UsersService,
  ) {}

  // sync on application startup
  @Timeout(0)
  @Cron(CronExpression.EVERY_10_SECONDS)
  async syncDataFromTodoist() {
    console.log('sync from todoist');

    const users = await this.usersService.findAllWithTodoistAPIKey();

    for (const user of users) {
      if (user.todoistApiKey == null) {
        continue;
      }

      const result = await this.todoistApiService.sync(
        user.todoistApiKey,
        user.syncToken ?? '*',
      );

      // TODO: create bulk sync function
      for (const item of result.items) {
        const internalTodo = await this.todosService.findOneByTodoistID(
          item.id,
        );
        if (internalTodo) {
          await this.todosService.update(internalTodo._id, {
            id: internalTodo.id,
            title: item.content,
            description: item.description,
            userId: user._id,
          });
        } else {
          await this.todosService.create({
            title: item.content,
            description: item.description,
            todoistID: item.id,
            status: item.checked ? TodoStatus.DONE : TodoStatus.TODO,
            userId: user._id,
          });
        }
      }

      // Only store the sync token after all updates have persisted. To prevent
      // lost syncs.
      await this.usersService.update(user._id, {
        syncToken: result.sync_token,
      });
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
      if (todo.todoistId) {
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
