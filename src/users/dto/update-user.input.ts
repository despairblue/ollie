import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  todoistApiKey?: string;

  syncToken?: string;
}
