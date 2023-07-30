import { Test, TestingModule } from '@nestjs/testing';
import { TodoistSyncService } from './todoist-sync.service';

describe('TodoistSyncService', () => {
  let service: TodoistSyncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoistSyncService],
    }).compile();

    service = module.get<TodoistSyncService>(TodoistSyncService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
