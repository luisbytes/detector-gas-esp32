import { Test, TestingModule } from '@nestjs/testing';
import { RealtimeDatabaseService } from './realtime-database.service';

describe('RealtimeDatabaseService', () => {
  let service: RealtimeDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealtimeDatabaseService],
    }).compile();

    service = module.get<RealtimeDatabaseService>(RealtimeDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
