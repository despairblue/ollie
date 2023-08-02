import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateListInput {
  @Field(() => String)
  name: string;
}
