import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Todo } from '../todos/entities/todo.entity';
import { TodosService } from '../todos/todos.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlJWTAuthGuard } from 'src/auth/graphql-jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly todosService: TodosService,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @UseGuards(GraphqlJWTAuthGuard)
  @Query(() => User, { name: 'me' })
  me(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(GraphqlJWTAuthGuard)
  @Mutation(() => User, { nullable: true })
  updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() user: User,
  ) {
    if (String(user._id) !== id) {
      return null;
    }

    return this.usersService.update(id, updateUserInput);
  }

  @UseGuards(GraphqlJWTAuthGuard)
  @ResolveField('todos', () => [Todo])
  async getTodos(@Parent() user: User) {
    return this.todosService.findAllByUser({ userId: user._id });
  }
}
