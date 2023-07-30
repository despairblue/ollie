import { Module } from '@nestjs/common';

import { TodoistApiService } from './todoist-api.service';
import { HttpModule } from '@nestjs/axios';
import { TodosModule } from 'src/todos/todos.module';
import { TodoistSyncService } from './todoist-sync.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [HttpModule, TodosModule, UsersModule],
  providers: [TodoistApiService, TodoistSyncService],
})
export class TodoistModule {}
