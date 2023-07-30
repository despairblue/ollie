import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { addFieldMetadata } from '@nestjs/graphql';
import { z } from 'zod';

const SyncResponseSchema = z.object({
  sync_token: z.string(),
  items: z.array(
    z.object({
      checked: z.boolean(),
      content: z.string(),
      description: z.string(),
      id: z.string(),
      project_id: z.string(),
    }),
  ),
});

const AddTaskResponseSchema = z.object({
  id: z.string(),
});

// TODO: rename to TodoistSyncService
@Injectable()
export class TodoistApiService {
  constructor(private readonly httpService: HttpService) {}

  async sync(authToken: string, syncToken: string = '*') {
    // Using axiosRef here because I don't think we need an Observable just for this.
    // TODO: extract into own service
    const response = await this.httpService.axiosRef.post(
      'https://api.todoist.com/sync/v9/sync',
      { sync_token: syncToken, resource_types: ['items'] },
      { headers: { Authorization: `Bearer ${authToken}` } },
    );

    console.log(response.data);

    // always parse incoming data
    return SyncResponseSchema.parse(response.data);
  }

  async addTask(
    authToken: string,
    task: {
      content: string;
      description: string;
      projectId?: string;
    },
  ) {
    const response = await this.httpService.axiosRef.post(
      'https://api.todoist.com/rest/v2/tasks',
      {
        content: task.content,
        description: task.description,
        project_id: task.projectId,
      },
      { headers: { Authorization: `Bearer ${authToken}` } },
    );

    return AddTaskResponseSchema.parse(response.data);
  }

  async updateTask(
    authToken: string,
    taskId: string,
    input: {
      content: string;
      description: string;
      projectId?: string;
    },
  ) {
    console.log(input);
    const response = await this.httpService.axiosRef.post(
      `https://api.todoist.com/rest/v2/tasks/${taskId}`,
      {
        content: input.content,
        description: input.description,
        project_id: input.projectId,
      },
      { headers: { Authorization: `Bearer ${authToken}` } },
    );

    return AddTaskResponseSchema.parse(response.data);
  }
}
