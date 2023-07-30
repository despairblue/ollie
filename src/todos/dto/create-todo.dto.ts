import { ObjectId } from 'mongoose';

export class CreateTodoDto {
  readonly title: string;
  readonly description: string;
  readonly status: 'TODO' | 'DONE';
  readonly userId: string | ObjectId;
  readonly todoistID?: string;
}
