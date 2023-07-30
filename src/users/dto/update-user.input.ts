import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  username: string;

  @Field(() => String)
  name?: string;

  @Field(() => String)
  todoistApiKey?: string;
}
