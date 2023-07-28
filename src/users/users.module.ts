import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TodosService } from '../todos/todos.service';

@Module({
  providers: [UsersResolver, UsersService, TodosService],
})
export class UsersModule {}
