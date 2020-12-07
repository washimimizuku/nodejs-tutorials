import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/Ticket';

import { cookieHelper } from '../../test/cookie-helper';

it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).toEqual(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const cookie = await cookieHelper('test@test.com');

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  const cookie = await cookieHelper('test@test.com');

  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      price: 10,
    })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  const cookie = await cookieHelper('test@test.com');

  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Test title',
      price: -10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Test title',
    })
    .expect(400);
});

it('creates a ticket with valid inputs', async () => {
  const cookie = await cookieHelper('test@test.com');

  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const title = 'Test title';
  const price = 20;

  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: title,
      price: price,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual(title);
  expect(tickets[0].price).toEqual(price);
});
