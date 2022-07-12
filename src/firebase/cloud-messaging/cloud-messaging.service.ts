import { Injectable } from '@nestjs/common';
import { messaging } from 'firebase-admin';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';

@Injectable()
export class CloudMessagingService {
    private messaging = messaging();

    async sendNotifications(message: Message) {
        return this.messaging.send(message);
    }
}
