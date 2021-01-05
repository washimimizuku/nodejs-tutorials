import {
  Listener,
  OrderCancelledEvent,
  OrderCreatedEvent,
  Subjects,
} from '@washimimizuku/ticketing-common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {}
}
