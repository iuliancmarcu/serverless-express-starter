import 'source-map-support/register';

import express from 'express';
import cors from 'cors';
import { configure as serverlessExpress } from '@vendia/serverless-express';

import routes from './routes';

const app = express();
app.use(cors());
app.use(routes);

export const handler = serverlessExpress({ app });
