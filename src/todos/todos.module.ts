import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosResolver } from './todos.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './entities/todo.entity';
import { ListsModule } from 'src/lists/lists.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    ListsModule,
  ],
  providers: [TodosResolver, TodosService],

  exports: [TodosService, MongooseModule],
})
export class TodosModule {}
