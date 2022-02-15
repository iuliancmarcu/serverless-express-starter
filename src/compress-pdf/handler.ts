import { createReadStream } from 'fs';

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { getCurrentInvoke } from '@vendia/serverless-express';

import downloadS3ObjectToDisk from '../utils/downloadS3ObjectToDisk';
import uploadToS3 from '../utils/uploadToS3';
import getS3SignedUrl from '../utils/getS3SignedUrl';
import { EXPIRES_IN_MS } from '../utils/constants';
import compressPdf, { isValidCompressResolution } from '../utils/compressPdf';

const handler: RequestHandler = asyncHandler(async (_req, res) => {
  const {
    event,
    context: { awsRequestId },
  } = getCurrentInvoke();

  let objectId: string;
  let resolution: string;

  try {
    const body = JSON.parse(event.body);
    objectId = body.id;
    resolution = body.resolution;
  } catch (err) {
    res.status(400).send('Event body could not be parsed');
    return;
  }

  if (!isValidCompressResolution(resolution)) {
    res.status(400).send('Resolution is not "low", "medium" or "high"');
    return;
  }

  // download S3 file based on given id
  const sourcePath = await downloadS3ObjectToDisk(objectId);

  // convert file
  const resultPath = compressPdf(sourcePath, resolution);
  const resultObjectId = `${awsRequestId}.pdf`;

  // store result in S3 and generate view URL
  const fileStream = createReadStream(resultPath);
  await uploadToS3(fileStream, resultObjectId);
  const url = getS3SignedUrl(resultObjectId);

  const expiresAt = Date.now() + EXPIRES_IN_MS;

  // send back url
  res.send(JSON.stringify({ url, expiresAt }));
});

export default handler;
