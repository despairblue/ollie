import { ObjectId } from 'mongoose';
import { CreateTodoInput } from './create-todo.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  // TODO pass id as seperate arg
  @Field(() => ID)
  id: string;

  @Field(() => String, { description: 'Title of the Todo' })
  title: string;

  @Field(() => String, { description: 'Description of the Todo' })
  description: string;

  userId?: string | ObjectId;
}
