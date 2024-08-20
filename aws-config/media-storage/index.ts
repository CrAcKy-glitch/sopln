import S3 from "aws-sdk/clients/s3";
import fs from "fs";

const s3Client = new S3({
  region: process.env.APPLICATION_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export default async function Bucket({
  fileinfo,
  key,
  Bucket,
}: {
  fileinfo: any;
  key: string;
  Bucket?: string;
}) {
  try {
    const uploadResult = await s3Client
      .upload({
        Bucket: Bucket || (process.env.BUCKET_NAME as string),
        Body: fs.readFileSync(fileinfo.path),
        Key: key,
        ContentType: fileinfo.headers["content-type"],
      })
      .promise();

    return { fileinfo, location: uploadResult.Location };
  } catch (error) {
    throw error;
  }
}
