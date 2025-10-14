import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { s3Config } from '~/config/s3.config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const useS3 = new S3Client({
    region: s3Config.region,
    endpoint: s3Config.endpoint,
    credentials: {
        accessKeyId: s3Config.accessKeyId!,
        secretAccessKey: s3Config.secretAccessKey!,
    },
});

export const createThemeFile = (bucketName: string, key: string, file: Express.Multer.File) => {
    if (!file) {
        return;
    }

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: 'application/pdf',
    });

    return useS3.send(command);
};

export async function getFile(key: string) {
    const command = new GetObjectCommand({
        Bucket: s3Config.bucketEssayHelpersDocsName,
        Key: key,
    });

    return await getSignedUrl(useS3, command, { expiresIn: 3600 });
}

export default useS3;
