import { Injectable } from '@nestjs/common';
import { RealtimeDatabaseService } from './firebase/realtime-database/realtime-database.service';

@Injectable()
export class AppService {

  constructor(
    private readonly realtimeDatabaseService: RealtimeDatabaseService,
  ) { }

  async addData(
    value: number
  ): Promise<void> {
    return await this.realtimeDatabaseService.add('tracing', { value })
  }
}
