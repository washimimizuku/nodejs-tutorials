import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from '@washimimizuku/ticketing-common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
