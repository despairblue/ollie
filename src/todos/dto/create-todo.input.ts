import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'Title of the Todo' })
  title: string;

  @Field(() => String, { description: 'Description of the Todo' })
  description: string;
}
