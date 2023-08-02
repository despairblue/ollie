import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema()
export class User {
  @Field(() => ID, { name: 'id', description: "The user's name" })
  _id: ObjectId;

  @Field(() => String, { description: "The user's name" })
  @Prop({ unique: true })
  username: string;

  // In a production system we wouldn't store the password, but salt and hash
  // it and store the hash.
  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  todoistApiKey?: string;

  @Prop()
  lastSyncedAt: Date;

  @Prop()
  syncToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
