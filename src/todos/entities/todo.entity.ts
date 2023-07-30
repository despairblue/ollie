import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { TodoStatus } from '../todo.schema';

@ObjectType()
export class Todo {
  @Field(() => String, { description: 'Unique ID of the Todo.' })
  id: string;

  @Field(() => String, { description: 'Title of the Todo' })
  title: string;

  @Field(() => String, { description: 'Description of the Todo' })
  description: string;

  @Field(() => TodoStatus, { description: 'The status if the Todo' })
  status: TodoStatus;

  @Field(() => String, {
    description: 'The ID of the item in Todoist',
    nullable: true,
  })
  todoistID?: string;

  updatedAt: Date;
}

registerEnumType(TodoStatus, { name: 'TodoStatus' });
