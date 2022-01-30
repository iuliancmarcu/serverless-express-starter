import { Router } from 'express';

import getUploadUrl from './get-upload-url';
import toBase64 from './to-base64';

const routes = Router();

routes.all('/to-base64', toBase64);
routes.all('/get-upload-url', getUploadUrl);

export default routes;
