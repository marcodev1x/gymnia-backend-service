import { GymniaEssayThemesRepository } from './repository';
import { GymniaEssayThemes } from './model';
import { createThemeFileZip, getFile } from '../bucket';
import { s3Config } from '~/config/s3.config';
import { formatThemeTitle, getKeyFromBackblazeUrl } from './helpers';
import { SendHttpError } from '~/generic-errors';
import axios from 'axios';
import { Response } from 'express';
import { SendGymniaThemesError } from '~/errors/gymnia-themes-errors';
import { Pagination } from '~/types/Pagination';

export class GymniaEssayThemesService {
    constructor(private gymniaEssayThemesRepository: GymniaEssayThemesRepository) {}

    async getThemes(pagination: Pagination) {
        return await this.gymniaEssayThemesRepository.getThemes(pagination);
    }

    async getThemeById(id: number) {
        const theme = await this.gymniaEssayThemesRepository.getThemeById(id);

        if (!theme) throw SendHttpError({ element: 'Theme', error: 'NOT_FOUND' });

        if (!theme.is_active) throw SendGymniaThemesError('THEME_NOT_ACTIVE');

        return theme;
    }

    async createTheme(theme: GymniaEssayThemes, file: Express.Multer.File) {
        const formatNewTheme = { ...theme } as GymniaEssayThemes;

        const uploadFile = await createThemeFileZip(
            s3Config.bucketEssayHelpersDocsName!,
            formatThemeTitle(theme.theme_title),
            file,
        );

        if (uploadFile) {
            formatNewTheme.bucket_essay_docs = `https://${s3Config.bucketEssayHelpersDocsName}`+
            `/${formatThemeTitle(theme.theme_title)}`;
        }

        return await this.gymniaEssayThemesRepository.createTheme(formatNewTheme);
    }

    async downloadThemeWithSignedUrl(id: number, response: Response) {
        const theme = await this.getThemeById(Number(id));

        if (!theme.bucket_essay_docs) {
            throw SendHttpError({ element: 'Theme document', error: 'NOT_FOUND' });
        }

        const fileKey = getKeyFromBackblazeUrl(theme.bucket_essay_docs);

        const signedUrl = await getFile(fileKey);

        const fileResponse = await axios.get(signedUrl, {
            responseType: 'stream',
        });

        response.setHeader('Content-Disposition', `attachment; filename="${theme.theme_title}.zip"`);
        response.setHeader('Content-Type', 'application/zip');

        fileResponse.data.pipe(response);
    }
}
