import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ListsService } from './lists.service';
import { List } from './entities/list.entity';
import { CreateListInput } from './dto/create-list.input';
import { GraphqlJWTAuthGuard } from 'src/auth/graphql-jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Todo } from 'src/todos/entities/todo.entity';
import { TodosService } from 'src/todos/todos.service';

@Resolver(() => List)
export class ListsResolver {
  constructor(
    private readonly listsService: ListsService,
    private readonly todosService: TodosService,
  ) {}

  @UseGuards(GraphqlJWTAuthGuard)
  @Mutation(() => List)
  createList(
    @Args('createListInput') createListInput: CreateListInput,
    @CurrentUser() user: User,
  ) {
    return this.listsService.create({ ...createListInput, userId: user._id });
  }

  @UseGuards(GraphqlJWTAuthGuard)
  @ResolveField(() => [Todo])
  async todos(@Parent() list: List) {
    return this.todosService.findAllbyList(list._id);
  }
}
