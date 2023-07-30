import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TodosService } from '../todos/todos.service';
import { TodosModule } from 'src/todos/todos.module';

@Module({
  imports: [TodosModule],
  providers: [UsersResolver, UsersService, TodosService],
})
export class UsersModule {}
