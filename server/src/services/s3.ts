import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getRandomImageName } from '../utils/getRandomName.js';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  region: process.env.BUCKET_REGION,
});

export const uploadToS3 = async (
  filename: string,
  buffer: Buffer,
  mimetype: string
) => {
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: filename,
    Body: buffer,
    ContentType: mimetype,
    ContentLength: buffer.length,
  });

  await s3.send(command);
};

export async function getPresignedUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  });

  const url = await getSignedUrl(s3, command);
  return url;
}
