import { createReadStream } from 'fs';

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { getCurrentInvoke } from '@vendia/serverless-express';

import downloadS3ObjectToDisk from '../utils/downloadS3ObjectToDisk';
import uploadToS3 from '../utils/uploadToS3';
import getS3SignedUrl from '../utils/getS3SignedUrl';
import convertPdfToOffice from '../utils/convertPdfToOffice';
import isSupportedOfficeFormat from '../utils/isOfficeFormatSupported';
import { EXPIRES_IN_MS } from '../utils/constants';

const handler: RequestHandler = asyncHandler(async (_req, res) => {
  const {
    event,
    context: { awsRequestId },
  } = getCurrentInvoke();

  let objectId: string;
  let format: string;

  try {
    const body = JSON.parse(event.body);
    objectId = body.id;
    format = body.format;
  } catch (err) {
    res.status(400).send('Event body could not be parsed');
    return;
  }

  if (!isSupportedOfficeFormat(format)) {
    res.status(400).send(`Target format "${format}" is not supported`);
    return;
  }

  // download S3 file based on given id
  await downloadS3ObjectToDisk(objectId);

  // convert file
  const resultPath = await convertPdfToOffice(objectId, format);
  const resultObjectId = `${awsRequestId}.${format}`;

  // store result in S3 and generate view URL
  const fileStream = createReadStream(resultPath);
  await uploadToS3(fileStream, resultObjectId);
  const url = getS3SignedUrl(resultObjectId);

  const expiresAt = Date.now() + EXPIRES_IN_MS;

  // send back url
  res.send(JSON.stringify({ url, expiresAt }));
});

export default handler;
