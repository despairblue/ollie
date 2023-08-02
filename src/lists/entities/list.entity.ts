import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type ListDocument = HydratedDocument<List>;

@ObjectType()
@Schema()
export class List {
  @Field(() => ID, { name: 'id', description: 'Unique ID of the Todo.' })
  _id: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: ObjectId;

  @Prop({ type: String })
  todoistId?: string;
}

export const ListSchema = SchemaFactory.createForClass(List);
