import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, { description: 'The ID of the user' })
  id: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;

  lastSyncAt: Date;
}
