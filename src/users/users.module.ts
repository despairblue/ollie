import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TodosService } from '../todos/todos.service';
import { TodosModule } from '../todos/todos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { ListsModule } from 'src/lists/lists.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TodosModule,
    ListsModule,
  ],
  providers: [UsersResolver, UsersService, TodosService],
  exports: [UsersService],
})
export class UsersModule {}
