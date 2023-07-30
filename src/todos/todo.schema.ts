import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

export enum TodoStatus {
  TODO = 'TODO',
  DONE = 'DONE',
}

@Schema()
export class Todo {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: TodoStatus })
  status: TodoStatus;

  @Prop({ required: false })
  todoistID?: string;

  @Prop()
  updatedAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
