import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

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
}

export enum TodoStatus {
  TODO,
  DONE,
}

registerEnumType(TodoStatus, { name: 'TodoStatus' });
