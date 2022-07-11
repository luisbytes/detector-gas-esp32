import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { FirestoreService } from './firebase';

@Injectable()
export class AppService {

  constructor(
    private readonly firestoreService: FirestoreService,
  ) { }

  async startDrain(
    value: number
  ): Promise<void> {
    const date = moment().utc().toString();

    return await this.firestoreService.add('/tracing', {
      startDate: date,
      value
    })
  }

  async statusDrain(
    value: number
  ): Promise<void> {
    const last = await this.firestoreService.getLast('tracing');

    await last.ref.update({
      value
    })
  }

  async endDrain(
    value: number,
    time: number
  ): Promise<void> {
    const last = await this.firestoreService.getLast('tracing');
    const data = last.data();
    const date = moment(data.startDate).add(time, 'second').utc().toString();

    await last.ref.update({
      endingDate: date,
      value
    });
  }
}
