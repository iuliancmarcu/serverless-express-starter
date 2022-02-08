import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { getCurrentInvoke } from '@vendia/serverless-express';

import getS3SignedUrl from '../utils/getS3SignedUrl';

const handler: RequestHandler = asyncHandler(async (_req, res) => {
  const {
    context: { awsRequestId },
  } = getCurrentInvoke();

  const signedUploadUrl = getS3SignedUrl(awsRequestId, { expiresInSeconds: 300, operation: 'putObject' });
  const signedViewUrl = getS3SignedUrl(awsRequestId, { expiresInSeconds: 300, operation: 'getObject' });

  res.send({
    uploadUrl: signedUploadUrl,
    viewUrl: signedViewUrl,
    id: awsRequestId,
  });
});

export default handler;
