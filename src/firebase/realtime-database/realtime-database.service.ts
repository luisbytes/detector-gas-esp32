import { Injectable } from '@nestjs/common';
import { database } from 'firebase-admin';
import { Reference } from '@firebase/database-types';

@Injectable()
export class RealtimeDatabaseService {
    private db = database();

    async getLast(path: string) {
        const lastRef = this.db.ref(path).orderByKey().limitToLast(1);
        const last = await lastRef.get();
        const json = last.toJSON();
        const key = Object.keys(json)[0];

        return this.db.ref(`${path}/${key}`).get();
    }

    async add(path: string, data: any) {
        return new Promise<void>((resolve, _reject) => {
            const ref = this.db.ref(path);
            ref.push(data, () => { resolve() })
        });
    }
}
