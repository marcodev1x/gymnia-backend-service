import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { s3Config } from '~/config/s3.config';
import { formatThemeTitle } from './gymnia-essay-themes/helpers';

const useS3 = new S3Client({
    region: s3Config.region,
    endpoint: s3Config.endpoint,
    credentials: {
        accessKeyId: s3Config.accessKeyId!,
        secretAccessKey: s3Config.secretAccessKey!,
    },
});

export const createThemeFileZip = (bucketName: string, key: string, file: Express.Multer.File) => {
    if (!file) {
        return;
    }

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: 'application/zip',
    });

    return useS3.send(command);
};

export async function getFile(key: string) {
    const command = new GetObjectCommand({
        Bucket: s3Config.bucketEssayHelpersDocsName,
        Key: formatThemeTitle(key),
    });

    console.log(command);

    const response = await useS3.send(command);

    if (!response.Body) {
        throw new Error('Arquivo não encontrado');
    }

    return response.Body as NodeJS.ReadableStream;
}

export default useS3;
