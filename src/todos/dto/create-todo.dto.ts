export class CreateTodoDto {
  readonly title: string;
  readonly description: string;
  readonly status: 'TODO' | 'DONE';
  readonly todoistID?: string;
}
