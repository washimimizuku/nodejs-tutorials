import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from '@washimimizuku/ticketing-common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
