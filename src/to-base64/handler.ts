import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { getCurrentInvoke } from '@vendia/serverless-express';
import { parse } from 'lambda-multipart-parser';

import validateRecaptchaToken from '../utils/validate-recaptcha-token';

const handler: RequestHandler = asyncHandler(async (_req, res) => {
  const { event } = getCurrentInvoke();
  const captchaToken = event.headers['X-Recaptcha-Token'];

  const valid = await validateRecaptchaToken(captchaToken);

  if (!valid) {
    res.status(403).send();
    return;
  }

  const { files } = await parse(event);
  const b64 = files[0].content.toString('base64');

  res.send(`data:image/png;base64,${b64}`);
});

export default handler;
