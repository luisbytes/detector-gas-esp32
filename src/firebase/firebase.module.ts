import { Global, Module } from '@nestjs/common';
import admin from 'firebase-admin';

import { RealtimeDatabaseService } from './realtime-database/realtime-database.service';
import { CloudMessagingService } from './cloud-messaging/cloud-messaging.service';

@Global()
@Module({
  providers: [RealtimeDatabaseService, CloudMessagingService],
  exports: [RealtimeDatabaseService, CloudMessagingService]
})
export class FirebaseModule {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ID,
        privateKey: process.env.FIREBASE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_EMAIL,
      }),
      databaseURL: process.env.FIREBASE_DATABASE
    });
  }
}
