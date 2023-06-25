import { Global, Module } from '@nestjs/common';
import admin from 'firebase-admin';
import { CloudMessagingService } from './cloud-messaging/cloud-messaging.service';
import { FirestoreService } from './firestore/firestore.service';

@Global()
@Module({
  providers: [CloudMessagingService, FirestoreService],
  exports: [CloudMessagingService, FirestoreService],
})
export class FirebaseModule {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ID,
        privateKey: process.env.FIREBASE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_EMAIL,
      }),
      databaseURL: process.env.FIREBASE_DATABASE,
    });
  }
}
