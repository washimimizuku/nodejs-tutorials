import request from 'supertest';

import { app } from '../../app';

it('can fetch a list of tickets', async () => {
  const response = await request(app)
    .get('/this/path/does/not/exist')
    .send()
    .expect(404);
});
