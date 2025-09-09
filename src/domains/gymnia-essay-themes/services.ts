import { GymniaEssayThemesRepository } from './repository';
import { GymniaEssayThemes } from './model';
import useS3, { createThemeFileZip } from '../bucket';
import { s3Config } from '~/config/s3.config';
import { formatThemeTitle, getKeyFromBackblazeUrl } from './helpers';
import { ThrowHttpError } from '~/generic-errors';
import axios from 'axios';
import { Response } from 'express';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ThrowGymniaThemesError } from '~/errors/gymnia-themes-errors';

export class GymniaEssayThemesService {
    constructor(private gymniaEssayThemesRepository: GymniaEssayThemesRepository) {}

    async getThemes() {
        return await this.gymniaEssayThemesRepository.getThemes();
    }

    async getThemeById(id: number) {
        const theme = await this.gymniaEssayThemesRepository.getThemeById(id);

        if (!theme) throw ThrowHttpError({ element: 'Theme', error: 'NOT_FOUND' });

        if (!theme.is_active) throw ThrowGymniaThemesError('THEME_NOT_ACTIVE');

        return theme;
    }

    async createTheme(theme: GymniaEssayThemes, file: Express.Multer.File) {
        const formatNewTheme = { ...theme } as GymniaEssayThemes;

        const uploadFile = await createThemeFileZip(
            s3Config.bucketEssayHelpersDocsName,
            formatThemeTitle(theme.theme_title),
            file,
        );

        if (uploadFile) {
            formatNewTheme.bucket_essay_docs = formatThemeTitle(theme.theme_title);
        }

        return await this.gymniaEssayThemesRepository.createTheme(formatNewTheme);
    }

    async downloadThemeWithSignedUrl(id: number, response: Response) {
        const theme = await this.getThemeById(Number(id));

        if (!theme.bucket_essay_docs) {
            throw ThrowHttpError({ element: 'Theme document', error: 'NOT_FOUND' });
        }

        const fileKey = getKeyFromBackblazeUrl(theme.bucket_essay_docs);

        const command = new GetObjectCommand({
            Bucket: s3Config.bucketEssayHelpersDocsName,
            Key: fileKey,
        });

        const signedUrl = await getSignedUrl(useS3, command, { expiresIn: 3600 });

        const fileResponse = await axios.get(signedUrl, {
            responseType: 'stream',
        });

        response.setHeader('Content-Disposition', `attachment; filename="${theme.theme_title}.zip"`);
        response.setHeader('Content-Type', 'application/zip');

        fileResponse.data.pipe(response);
    }
}
