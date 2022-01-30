import 'source-map-support/register';

import express from 'express';
import { configure as serverlessExpress } from '@vendia/serverless-express';

import routes from './routes';

const app = express();
app.use(routes);

export const handler = serverlessExpress({ app });
