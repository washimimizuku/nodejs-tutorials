import { Publisher } from './Publisher';
import { Subjects } from './subjects';
import { TicketCreatedEvent } from './TicketCreatedEvent';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
