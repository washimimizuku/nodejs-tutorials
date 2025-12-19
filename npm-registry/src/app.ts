import * as express from 'express';
import { getPackage, getPackageTree } from './package';

/**
 * Bootstrap the application framework
 */
export function createApp() {
  const app = express();

  app.set('view engine', 'ejs');

  app.use(express.json());

  app.get('/package/:name/:version', getPackage);
  app.get('/packageTree/:name/:version', getPackageTree);

  return app;
}
