import { OrderStatus } from '@washimimizuku/ticketing-common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { cookieHelper } from '../../test/cookie-helper';
import { stripe } from '../../stripe';

jest.mock('../../stripe');

it('returns a 404 when purchasing an order that does not exist', async () => {
  const cookie = await cookieHelper('test@test.com');

  await request(app)
    .post('/api/payments')
    .set('Cookie', cookie)
    .send({
      token: 'FAKE_TOKEN',
      orderId: mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it('returns a 401 when purchasing an order that does not belong to the user', async () => {
  const cookie = await cookieHelper('test@test.com');

  const order = await Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', cookie)
    .send({
      token: 'FAKE_TOKEN',
      orderId: order.id,
    })
    .expect(401);
});

it('returns a 400 when purchasing a cancelled order', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const cookie = await cookieHelper('test@test.com', userId);

  const order = await Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', cookie)
    .send({
      token: 'FAKE_TOKEN',
      orderId: order.id,
    })
    .expect(400);
});

it('returns a 201 with valid inputs', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const cookie = await cookieHelper('test@test.com', userId);

  const order = await Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', cookie)
    .send({
      token: 'tok_visa',
      orderId: order.id,
    })
    .expect(201);

  const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
  expect(chargeOptions.source).toEqual('tok_visa');
  expect(chargeOptions.amount).toEqual(20 * 100);
  expect(chargeOptions.currency).toEqual('eur');
});
