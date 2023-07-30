import { ObjectType, Field, registerEnumType, ID } from '@nestjs/graphql';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TodoDocument = HydratedDocument<Todo>;

export enum TodoStatus {
  TODO = 'TODO',
  DONE = 'DONE',
}
registerEnumType(TodoStatus, { name: 'TodoStatus' });

@ObjectType()
@Schema()
export class Todo {
  @Field(() => ID, { name: 'id', description: 'Unique ID of the Todo.' })
  _id: string;

  @Field(() => String, { description: 'Title of the Todo' })
  @Prop()
  title: string;

  @Field(() => String, { description: 'Description of the Todo' })
  @Prop()
  description: string;

  @Field(() => TodoStatus, { description: 'The status if the Todo' })
  @Prop({ enum: TodoStatus })
  status: TodoStatus;

  @Field(() => String, {
    description: 'The ID of the item in Todoist',
    nullable: true,
  })
  @Prop({ required: false })
  todoistID?: string;

  @Prop()
  updatedAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
