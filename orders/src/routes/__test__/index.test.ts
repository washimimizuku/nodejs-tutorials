import request from 'supertest';

import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { cookieHelper } from '../../test/cookie-helper';

const createTicket = async (title: string, price: number) => {
  const ticket = Ticket.build({
    title: title,
    price: price,
  });
  await ticket.save();

  return ticket;
};

it('can fetch a list of orders for a particular user', async () => {
  // Create three tickets
  const ticketOne = await createTicket('Test title 1', 10);
  const ticketTwo = await createTicket('Test title 2', 20);
  const ticketThree = await createTicket('Test title 3', 30);

  // "Login" two users
  const cookie1 = await cookieHelper('test1@test.com');
  const cookie2 = await cookieHelper('test2@test.com');

  // Create one order as User #1
  await request(app)
    .post('/api/orders')
    .set('Cookie', cookie1)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  // Create two orders as User #2
  const { body: orderOne } = await request(app)
    .post('/api/orders')
    .set('Cookie', cookie2)
    .send({ ticketId: ticketTwo.id })
    .expect(201);
  const { body: orderTwo } = await request(app)
    .post('/api/orders')
    .set('Cookie', cookie2)
    .send({ ticketId: ticketThree.id })
    .expect(201);

  // Make request to get orders for User #2
  const response = await request(app)
    .get('/api/orders')
    .set('Cookie', cookie2)
    .send()
    .expect(200);

  // Make sure we only got the orders for User #2
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(orderOne.id);
  expect(response.body[1].id).toEqual(orderTwo.id);
  expect(response.body[0].ticket.id).toEqual(ticketTwo.id);
  expect(response.body[1].ticket.id).toEqual(ticketThree.id);
});
