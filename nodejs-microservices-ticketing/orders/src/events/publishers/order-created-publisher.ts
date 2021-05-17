import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@washimimizuku/ticketing-common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
