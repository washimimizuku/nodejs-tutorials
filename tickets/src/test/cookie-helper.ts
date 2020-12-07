import request from 'supertest';
import jwt from 'jsonwebtoken';

import { app } from '../app';

export const cookieHelper = async (email: string) => {
  // Build a JWT payload. { id, email }
  const payload = {
    id: 'test_id_123',
    email: email,
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string with the cookie with the encoded data
  return [`express:sess=${base64}`];
};
