import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { TodoStatus } from './todo.schema';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Mutation(() => Todo)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todosService.create({
      ...createTodoInput,
      status: TodoStatus.TODO,
    });
  }

  @Query(() => [Todo], { name: 'todos' })
  // todo add args
  findAll() {
    return this.todosService.findAll({ userId: '1' });
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
