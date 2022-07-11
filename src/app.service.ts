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
      value: this.getStatus(value)
    })
  }

  async statusDrain(
    value: number
  ): Promise<void> {
    const last = await this.firestoreService.getLast('tracing');

    await last.ref.update({
      value: this.getStatus(value)
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
      value: this.getStatus(value)
    });
  }

  private getStatus(value: number) {
    if (value <= 1000 && value > 5000) {
      return 0
    } else if (value <= 5000 && value > 7000) {
      return 1;
    } else if (value <= 7000) {
      return 2;
    }
  }
}
