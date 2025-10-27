import { EssayThemesRepository } from './repository';
import { EssayThemes } from './model';
import { createThemeFile, getFile } from '../bucket';
import { s3Config } from '~/config/s3.config';
import { formatThemeTitle, getKeyFromS3Url } from './helpers';
import { DefaultHttpError } from '~/generic-errors';
import axios from 'axios';
import { Response } from 'express';
import { SendThemesError } from '~/errors/themes-errors';
import { Pagination } from '~/types/express';
import { EssayClassification } from '../essay-classification/model';

export interface EssayThemesPossibleClassification {
    essayTheme: EssayThemes;
    classification?: EssayClassification;
}

export class EssayThemesService {
    constructor(private essayThemesRepository: EssayThemesRepository) {}

    async getThemes(pagination: Pagination) {
        return await this.essayThemesRepository.getThemes(pagination);
    }

    async getThemeById(id: number) {
        const theme = await this.essayThemesRepository.getThemeById(id);

        if (!theme) throw DefaultHttpError({ element: 'Theme', error: 'NOT_FOUND' });

        if (!theme.essayTheme.is_active) throw SendThemesError('THEME_NOT_ACTIVE');

        return theme;
    }

    async createTheme(theme: EssayThemesPossibleClassification, file: Express.Multer.File | null) {
        if (file) {
            const hashDocId = Buffer.from(Math
                .random()
                .toString())
                .toString('base64url');

            const uploadFile = await createThemeFile(
                s3Config.bucketEssayHelpersDocsName!,
                `${formatThemeTitle(theme.essayTheme.theme_title)}_${hashDocId}`,
                file,
            );

            if (uploadFile) {
                theme.essayTheme.bucket_essay_docs = `https://${s3Config.bucketEssayHelpersDocsName}.`
                    + `${s3Config.endpoint?.split('://')[1]}`
                    + `/${formatThemeTitle(theme.essayTheme.theme_title)}_${hashDocId}`;
            }
        }

        return await this.essayThemesRepository.createTheme(theme);
    }

    async downloadThemeWithSignedUrl(id: number, response: Response) {
        const theme = await this.getThemeById(Number(id));

        if (!theme.essayTheme.bucket_essay_docs) {
            throw DefaultHttpError({ element: 'Theme document', error: 'NOT_FOUND' });
        }

        const fileKey = getKeyFromS3Url(theme.essayTheme.bucket_essay_docs);

        const signedUrl = await getFile(fileKey);

        try {
            const fileResponse = await axios.get(signedUrl, {
                responseType: 'stream',
            });

            response.setHeader('Content-Disposition', `attachment; filename="${theme.essayTheme.theme_title}.pdf"`);
            response.setHeader('Content-Type', 'application/pdf');

            fileResponse.data.pipe(response);
        } catch (error) {
            logger.error(error);
            throw DefaultHttpError({ element: 'Theme document', error: 'NOT_FOUND' });
        }
    }
}
