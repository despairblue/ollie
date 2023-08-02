import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo, TodoStatus } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlJWTAuthGuard } from '../auth/graphql-jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ListsService } from '../lists/lists.service';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(
    private readonly todosService: TodosService,
    private readonly listsService: ListsService,
  ) {}

  @UseGuards(GraphqlJWTAuthGuard)
  @Mutation(() => Todo)
  createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
    @CurrentUser() user: User,
  ) {
    return this.todosService.create({
      ...createTodoInput,
      status: TodoStatus.TODO,
      userId: user._id,
    });
  }

  @UseGuards(GraphqlJWTAuthGuard)
  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.todosService.findOneById(id);
  }

  @UseGuards(GraphqlJWTAuthGuard)
  @Mutation(() => Todo)
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todosService.update(updateTodoInput.id, updateTodoInput);
  }

  @UseGuards(GraphqlJWTAuthGuard)
  @Mutation(() => Todo)
  markTodoAsDone(@Args('id', { type: () => ID }) id: string) {
    return this.todosService.markTodoAsDone(id);
  }

  @UseGuards(GraphqlJWTAuthGuard)
  @Mutation(() => Todo)
  async addTodoToList(
    @Args('id') id: string,
    @Args('listId') listId: string,
    @CurrentUser() user: User,
  ) {
    const todo = await this.todosService.findOneById(id);
    const list = await this.listsService.findOneById(listId);

    if (todo == null) {
      return null;
    }

    if (list == null) {
      return null;
    }

    if (String(todo.userId) != String(user._id)) {
      return null;
    }

    if (String(list.userId) != String(user._id)) {
      return null;
    }

    return this.todosService.addTodoToList(todo._id, list._id);
  }
}
