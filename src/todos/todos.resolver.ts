import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo, TodoStatus } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlJWTAuthGuard } from 'src/auth/graphql-jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

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
    return this.todosService.findOne(id);
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
}
