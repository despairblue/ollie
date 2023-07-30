import { Test, TestingModule } from '@nestjs/testing';
import { TodoistApiService } from './todoist-api.service';

describe('TodoistApiService', () => {
  let service: TodoistApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoistApiService],
    }).compile();

    service = module.get<TodoistApiService>(TodoistApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
