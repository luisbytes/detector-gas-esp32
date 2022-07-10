import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { RealtimeDatabaseService } from './firebase/realtime-database/realtime-database.service';

@Injectable()
export class AppService {

  constructor(
    private readonly realtimeDatabaseService: RealtimeDatabaseService,
  ) { }

  async startDrain(
    value: number
  ): Promise<void> {
    const date = moment().utc().toString();

    return await this.realtimeDatabaseService.add('/tracing', {
      startDate: date,
      startValue: value
    })
  }

  async endDrain(
    value: number,
    time: number
  ): Promise<void> {
    // const date = moment().utc()
    const last = await this.realtimeDatabaseService.getLast('tracing');
    const data = last.val();
    const date = moment(data.startDate).add(time, 'second').utc().toString();

    last.ref.update({
      endingDate: date,
      endingValue: value
    });

  }
}
