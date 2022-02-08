import { createWriteStream } from 'fs';
import { pipeline } from 'stream';

import AWS from 'aws-sdk';

async function downloadS3ObjectToDisk(objectId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const filePath = `/tmp/${objectId}`;

    const fileWriter = createWriteStream(filePath);

    const s3 = new AWS.S3({ region: process.env.AWS_REGION, signatureVersion: 'v4' });
    const s3Stream = s3.getObject({ Bucket: process.env.S3_BUCKET_NAME, Key: objectId }).createReadStream();

    pipeline(s3Stream, fileWriter, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(filePath);
    });
  });
}

export default downloadS3ObjectToDisk;
