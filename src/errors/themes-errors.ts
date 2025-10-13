import { HttpError } from '~/generic-errors';

export enum ThemesErrors {
    THEME_NOT_ACTIVE,
}

export const ThemesErrorsData = {
    THEME_NOT_ACTIVE: {
        message: 'Theme not active',
        status: 400,
    },
};

export const SendThemesError = (error: keyof typeof ThemesErrors): never => {
    const { message, status } = ThemesErrorsData[error];
    throw new HttpError(message, status);
};
