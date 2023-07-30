import { Module } from '@nestjs/common';

import { TodoistApiService } from './todoist-api.service';
import { HttpModule } from '@nestjs/axios';
import { TodosModule } from 'src/todos/todos.module';
import { ConfigModule } from '@nestjs/config';
import { TodoistSyncService } from './todoist-sync.service';

@Module({
  imports: [HttpModule, TodosModule, ConfigModule],
  providers: [TodoistApiService, TodoistSyncService],
})
export class TodoistModule {}
