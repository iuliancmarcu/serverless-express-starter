import { Router } from 'express';

import getUploadUrl from './get-upload-url';
import officeToPdf from './office-to-pdf';
import pdfToOffice from './pdf-to-office';

const routes = Router();

routes.all('/get-upload-url', getUploadUrl);
routes.all('/office-to-pdf', officeToPdf);
routes.all('/pdf-to-office', pdfToOffice);

export default routes;
