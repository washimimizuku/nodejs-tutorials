import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@washimimizuku/ticketing-common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
