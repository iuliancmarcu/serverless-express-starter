import AWS from 'aws-sdk';

export interface IGetS3SignedURLOptions {
  operation?: 'getObject' | 'putObject';
  expiresInSeconds?: number;
}

function getS3SignedUrl(objectId: string, options?: IGetS3SignedURLOptions) {
  const s3 = new AWS.S3({ region: process.env.AWS_REGION, signatureVersion: 'v4' });

  return s3.getSignedUrl(options?.operation || 'getObject', {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: objectId,
    Expires: options?.expiresInSeconds || 3600,
  });
}

export default getS3SignedUrl;
