import { Router } from 'express';

import getUploadUrl from './get-upload-url';
import officeToPdf from './office-to-pdf';
import pdfToOffice from './pdf-to-office';
import compressPdf from './compress-pdf';

const routes = Router();

routes.get('/get-upload-url', getUploadUrl);
routes.post('/office-to-pdf', officeToPdf);
routes.post('/pdf-to-office', pdfToOffice);
routes.post('/compress-pdf', compressPdf);

export default routes;
