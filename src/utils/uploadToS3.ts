import AWS from 'aws-sdk';

async function uploadToS3(source: AWS.S3.Body, objectId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3({ region: process.env.AWS_REGION, signatureVersion: 'v4' });
    s3.upload({ Bucket: process.env.S3_BUCKET_NAME, Key: objectId, Body: source }, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

export default uploadToS3;
