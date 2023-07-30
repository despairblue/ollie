import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema()
export class User {
  _id: ObjectId;

  @Prop({ unique: true })
  @Field(() => String, { description: "The user's name" })
  username: string;

  @Prop()
  password: string;

  @Prop({ required: false })
  todoistApiKey?: string;

  @Prop()
  lastSyncedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
