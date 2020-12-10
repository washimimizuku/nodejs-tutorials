import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@washimimizuku/ticketing-common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
