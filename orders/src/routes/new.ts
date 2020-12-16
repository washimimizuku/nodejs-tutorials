import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validationRequest,
} from '@washimimizuku/ticketing-common';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60; // 15 minutes

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    // Find the Ticket the User is trying to order in the database
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    // Make sure that this Ticket is not already reserved
    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError('Ticket is already reserved');
    }

    // Calculate an expiration date for this Order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // Build the Order and save it to the database
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket: ticket,
    });
    await order.save();

    // TODO: Publish an event saying that an order was created

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
