export const EXPIRES_IN_MS = Number(process.env.S3_BUCKET_EXPIRATION_DAYS) * 24 * 60 * 60 * 1000;
