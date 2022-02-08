import { Router } from 'express';

import getUploadUrl from './get-upload-url';
import officeToPdf from './office-to-pdf';

const routes = Router();

routes.all('/get-upload-url', getUploadUrl);
routes.all('/office-to-pdf', officeToPdf);

export default routes;
