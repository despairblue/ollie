import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
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

  @Mutation(() => Todo)
  @UseGuards(GraphqlJWTAuthGuard)
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

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.todosService.findOne(id);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todosService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => Todo)
  markTodoAsDone(@Args('id', { type: () => ID }) id: string) {
    return this.todosService.markTodoAsDone(id);
  }

  @Mutation(() => Todo)
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todosService.remove(id);
  }
}
