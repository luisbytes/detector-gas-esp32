import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';

@Injectable()
export class FirestoreService {
  private firestore = firestore();

  async getLast(path: string) {
    const ref = this.firestore
      .collection(path)
      .orderBy('startDate', 'asc')
      .limitToLast(1);
    const last = await ref.get();
    const doc = last.docs.map((doc) => {
      return doc;
    })[0];

    return doc;
  }

  async add(path: string, data: any) {
    await this.firestore.collection(path).add(data);
  }
}
