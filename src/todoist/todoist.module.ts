import { Module } from '@nestjs/common';

import { TodoistApiService } from './todoist-api.service';
import { HttpModule } from '@nestjs/axios';
import { TodosModule } from '../todos/todos.module';
import { TodoistSyncService } from './todoist-sync.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [HttpModule, TodosModule, UsersModule],
  providers: [TodoistApiService, TodoistSyncService],
})
export class TodoistModule {}
