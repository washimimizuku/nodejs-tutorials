import * as getPort from 'get-port';
import got from 'got';
import { Server } from 'http';
import { createApp } from '../src/app';

describe('/package/:name/:version endpoint', () => {
  let server: Server;
  let port: number;

  beforeAll(async (done) => {
    port = await getPort();
    server = createApp().listen(port, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('responds', async () => {
    const packageName = 'react';
    const packageVersion = '16.13.0';

    const res: any = await got(
      `http://localhost:${port}/package/${packageName}/${packageVersion}`
    ).json();

    expect(res.name).toEqual(packageName);
  });

  it('returns dependencies', async () => {
    const packageName = 'react';
    const packageVersion = '16.13.0';

    const res: any = await got(
      `http://localhost:${port}/package/${packageName}/${packageVersion}`
    ).json();

    expect(res.dependencies).toEqual([
      {
        dependencies: [{ name: 'js-tokens', version: '1.0.1' }],
        name: 'loose-envify',
        version: '1.1.0',
      },
      { name: 'object-assign', version: '4.1.1' },
      {
        dependencies: [
          {
            dependencies: [{ name: 'js-tokens', version: '3.0.0' }],
            name: 'loose-envify',
            version: '1.3.1',
          },
          { name: 'object-assign', version: '4.1.1' },
        ],
        name: 'prop-types',
        version: '15.6.2',
      },
    ]);
  });

  it('gives not found error when package does not exist', async () => {
    const packageName = 'this-is-an-imaginary-package';
    const packageVersion = '16.13.0';

    try {
      await got(
        `http://localhost:${port}/package/${packageName}/${packageVersion}`
      ).json();

      fail(`Expected failure response`);
    } catch (error) {
      expect(error.response.body).toContain('404');
    }
  });

  it('gives TypeError when version does not exist', async () => {
    const packageName = 'react';
    const packageVersion = '9916.13.0';

    try {
      await got(
        `http://localhost:${port}/package/${packageName}/${packageVersion}`
      ).json();

      fail(`Expected failure response`);
    } catch (error) {
      expect(error.response.body).toContain('TypeError: Cannot read property');
    }
  });
});

describe('/packageTree/:name/:version endpoint', () => {
  let server: Server;
  let port: number;

  beforeAll(async (done) => {
    port = await getPort();
    server = createApp().listen(port, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('responds', async () => {
    const packageName = 'react';
    const packageVersion = '16.13.0';

    const res: any = await got(
      `http://localhost:${port}/packageTree/${packageName}/${packageVersion}`
    );

    expect(res.body).toContain('name: react');
    expect(res.body).toContain('version: 16.13.0');
  });

  it('returns dependencies', async () => {
    const packageName = 'react';
    const packageVersion = '16.13.0';

    const res: any = await got(
      `http://localhost:${port}/packageTree/${packageName}/${packageVersion}`
    );

    expect(res.body).toContain('└─ dependencies');
    expect(res.body).toContain('name: loose-envify');
    expect(res.body).toContain('version: 1.1.0');
  });

  it('gives not found error when package does not exist', async () => {
    const packageName = 'this-is-an-imaginary-package';
    const packageVersion = '16.13.0';

    try {
      await got(
        `http://localhost:${port}/packageTree/${packageName}/${packageVersion}`
      );

      fail(`Expected failure response`);
    } catch (error) {
      expect(error.response.body).toContain('Not Found');
    }
  });
});
