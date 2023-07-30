import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: "The user's name" })
  username: string;

  @Field(() => String, { description: "THe user's password" })
  password: string;
}
