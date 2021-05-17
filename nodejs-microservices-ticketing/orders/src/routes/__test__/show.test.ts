import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { cookieHelper } from '../../test/cookie-helper';

const createTicket = async (title: string, price: number) => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: title,
    price: price,
  });
  await ticket.save();

  return ticket;
};

it('returns an error if a user tries to fetch an order that does not exist', async () => {
  const cookie = await cookieHelper('test@test.com');
  const fakeId = mongoose.Types.ObjectId();

  // Make request to fetch the order
  await request(app)
    .get(`/api/orders/${fakeId}`)
    .set('Cookie', cookie)
    .send()
    .expect(404);
});

it('returns an error if a user tries to fetch an order belonging to another user', async () => {
  // Create a ticket
  const ticket = await createTicket('Test title 1', 10);

  const cookie1 = await cookieHelper('test1@test.com');
  const cookie2 = await cookieHelper('test2@test.com');

  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', cookie1)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make request to fetch the order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', cookie2)
    .send()
    .expect(401);
});

it('fetches the order', async () => {
  // Create a ticket
  const ticket = await createTicket('Test title 1', 10);

  const cookie = await cookieHelper('test@test.com');

  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});
