import logger from '~/logger';

export function safeJsonParse(str: string) {
    if (str && typeof str === 'string') {
        try {
            return JSON.parse(str.replace(/```[a-z]*|```/gi, '').trim());
        } catch (e) {
            logger.warn(e);
            return null;
        }
    }

    if (str && typeof str === 'object') {
        return str;
    }
}
