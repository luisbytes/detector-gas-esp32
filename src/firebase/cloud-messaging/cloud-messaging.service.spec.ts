import { Test, TestingModule } from '@nestjs/testing';
import { CloudMessagingService } from './cloud-messaging.service';

describe('CloudMessagingService', () => {
  let service: CloudMessagingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudMessagingService],
    }).compile();

    service = module.get<CloudMessagingService>(CloudMessagingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
