export enum OrderStatus {
  // When the Order has been created, but the
  // Ticket it is trying to order has not been reserved.
  Created = 'created',

  // The Ticket the Order is trying to reserve has already
  // been reserved, or when the User has cancelled the order.
  // Or if the Order expires before payment.
  Cancelled = 'cancelled',

  // The Order has sucessfully reserved the Ticket.
  AwaitingPayment = 'awaiting:payment',

  // The Order has reserved the Ticket and the User has
  // provided payment successfully.
  Complete = 'complete',
}
