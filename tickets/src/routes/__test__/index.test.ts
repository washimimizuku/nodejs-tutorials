import request from 'supertest';

import { app } from '../../app';
import { cookieHelper } from '../../test/cookie-helper';

const createTicket = async (title: string, price: number) => {
  const cookie = await cookieHelper('test@test.com');

  return request(app).post('/api/tickets').set('Cookie', cookie).send({
    title: title,
    price: price,
  });
};

it('can fetch a list of tickets', async () => {
  await createTicket('Test title 1', 10);
  await createTicket('Test title 2', 20);
  await createTicket('Test title 3', 30);

  const response = await request(app).get('/api/tickets').send().expect(200);

  expect(response.body.length).toEqual(3);
});
