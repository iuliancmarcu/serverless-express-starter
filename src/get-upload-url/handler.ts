import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { getCurrentInvoke } from '@vendia/serverless-express';
import AWS from 'aws-sdk';

const handler: RequestHandler = asyncHandler(async (_req, res) => {
  const { context } = getCurrentInvoke();

  const s3 = new AWS.S3({ region: process.env.AWS_REGION, signatureVersion: 'v4' });
  const signedUploadUrl = s3.getSignedUrl('putObject', {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${context.awsRequestId}`,
    Expires: 300,
  });
  const signedViewUrl = s3.getSignedUrl('getObject', {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${context.awsRequestId}`,
    Expires: 3600,
  });

  res.send({
    uploadUrl: signedUploadUrl,
    viewUrl: signedViewUrl,
  });
});

export default handler;
