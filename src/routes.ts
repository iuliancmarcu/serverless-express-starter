import { Router } from 'express';

import toBase64 from './to-base64';

const routes = Router();

routes.all('/to-base64', toBase64);

export default routes;
