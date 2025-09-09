import { HttpError } from '~/generic-errors';

export enum GymniaThemesErrors {
    THEME_NOT_ACTIVE,
}

export const GymniaThemesErrorsData = {
    THEME_NOT_ACTIVE: {
        message: 'Theme not active',
        status: 400,
    },
};

export const ThrowGymniaThemesError = (error: keyof typeof GymniaThemesErrors): never => {
    const { message, status } = GymniaThemesErrorsData[error];
    throw new HttpError(message, status);
};
