import { Module, forwardRef } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsResolver } from './lists.resolver';
import { TodosModule } from 'src/todos/todos.module';
import { List, ListSchema } from './entities/list.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
    // TodosModule,
    forwardRef(() => TodosModule),
  ],
  providers: [ListsResolver, ListsService],
  exports: [ListsService],
})
export class ListsModule {}
