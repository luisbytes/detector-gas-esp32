import { Injectable } from '@nestjs/common';
import { database } from 'firebase-admin';
import { resolve } from 'path';

@Injectable()
export class RealtimeDatabaseService {
    private db = database();

    async add(path: string, data: any) {
        return new Promise<void>((resolve, _reject) => {
            const ref = this.db.ref(path);
            ref.push(data, () => { resolve() })
        });
    }
}
